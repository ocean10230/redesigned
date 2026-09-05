// public/sw.js
self.addEventListener("install", () => self.skipWaiting())
self.addEventListener("activate", (event) => event.waitUntil(clients.claim()))

const KB = (n) => n * 1024
const MB = (n) => n * 1024 * 1024

const WorkerConfig = {
  MetadataMax: KB(256),
  DataMax: KB(512),
  ThrottleDuration: 200, // ~5 req/s (200ms spacing)
  ThrottleByteThreshold: MB(16), // Activate throttle after 16MB served
}

const CachedChunk = {
  CurrentBuffer: { index: -1, buffer: null },
  FutureCache: { index: -1, bufferPromise: null },
}

let LastHandle = 0
let TotalBytesServed = 0

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url)
  if (url.pathname === "/stream") {
    event.respondWith(handleThrottledStreaming(event.request))
  }
})

async function fetchPartBuffer(partIndex, totalParts, videoUrl) {
  if (partIndex >= totalParts || !videoUrl) return null
  const partNumber = String(partIndex).padStart(2, "0")
  const partUrl = `${videoUrl}.part${partNumber}`

  try {
    const res = await fetch(partUrl)
    if (!res.ok) return null
    return await res.arrayBuffer()
  } catch (err) {
    console.error(`Failed to fetch part ${partIndex}:`, err)
    return null
  }
}

async function handleThrottledStreaming(request) {
  const url = new URL(request.url)
  const rangeHeader = request.headers.get("range")

  // Query parameters with fallbacks
  const rawSize = Number(url.searchParams.get("size")) || 8
  const BinaryChunkSize = rawSize <= 1024 ? MB(rawSize) : rawSize
  const TotalBinaryChunks = Number(url.searchParams.get("total")) || 32
  const VideoURL = url.searchParams.get("url") || "/vid/shiddings.mp4"
  const FullSize = BinaryChunkSize * TotalBinaryChunks

  if (!rangeHeader) return new Response(null, { status: 400 })

  // 1. Parse Range Header safely
  const parts = rangeHeader.replace(/bytes=/, "").split("-")
  let start = parseInt(parts[0], 10)
  if (isNaN(start)) start = 0
  let end = parts[1] ? parseInt(parts[1], 10) : FullSize - 1

  // 2. Cap response size
  const maxAllowedChunk = start === 0 ? WorkerConfig.MetadataMax : WorkerConfig.DataMax
  if (end - start + 1 > maxAllowedChunk) {
    end = start + maxAllowedChunk - 1
  }
  if (end >= FullSize) {
    end = FullSize - 1
  }

  // 3. Dynamic Rate Throttling
  if (TotalBytesServed >= WorkerConfig.ThrottleByteThreshold) {
    const now = performance.now()
    const timeSinceLastReq = now - LastHandle

    if (timeSinceLastReq < WorkerConfig.ThrottleDuration) {
      const waitTime = WorkerConfig.ThrottleDuration - timeSinceLastReq
      await new Promise((res) => setTimeout(res, waitTime))
    }
  }
  LastHandle = performance.now()

  const StartIndex = Math.floor(start / BinaryChunkSize)
  const OffsetWithin = start % BinaryChunkSize
  const ServingSize = end - start + 1

  // 4. Memory & Preload Management
  let activeBuffer = null

  if (CachedChunk.CurrentBuffer.index === StartIndex && CachedChunk.CurrentBuffer.buffer) {
    // Primary Cache Hit
    activeBuffer = CachedChunk.CurrentBuffer.buffer
  } else if (CachedChunk.FutureCache.index === StartIndex && CachedChunk.FutureCache.bufferPromise) {
    // Future Preload Hit
    activeBuffer = await CachedChunk.FutureCache.bufferPromise
    CachedChunk.CurrentBuffer = { index: StartIndex, buffer: activeBuffer }
    CachedChunk.FutureCache = { index: -1, bufferPromise: null }
  } else {
    // Cache Miss (Pass VideoURL parameter)
    activeBuffer = await fetchPartBuffer(StartIndex, TotalBinaryChunks, VideoURL)
    if (!activeBuffer) return new Response(null, { status: 404 })
    CachedChunk.CurrentBuffer = { index: StartIndex, buffer: activeBuffer }
  }

  // Trigger Future Cache Preload for next index (Pass VideoURL parameter)
  const NextIndex = StartIndex + 1
  if (
    NextIndex < TotalBinaryChunks &&
    CachedChunk.FutureCache.index !== NextIndex &&
    CachedChunk.CurrentBuffer.index !== NextIndex
  ) {
    CachedChunk.FutureCache = {
      index: NextIndex,
      bufferPromise: fetchPartBuffer(NextIndex, TotalBinaryChunks, VideoURL),
    }
  }

  // 5. Slice Data Payload & Build 206 Response
  const slicedData = activeBuffer.slice(OffsetWithin, OffsetWithin + ServingSize)
  const actualEnd = start + slicedData.byteLength - 1

  TotalBytesServed += slicedData.byteLength

  return new Response(slicedData, {
    status: 206,
    statusText: "Partial Content",
    headers: {
      "Content-Type": "video/mp4",
      "Content-Range": `bytes ${start}-${actualEnd}/${FullSize}`,
      "Content-Length": slicedData.byteLength.toString(),
      "Accept-Ranges": "bytes",
    },
  })
}