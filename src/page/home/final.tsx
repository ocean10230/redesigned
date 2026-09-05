"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function ContactSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Register Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/streaming.js")
        .then((reg) => {
          console.log("Stream SW Registered:", reg)
          setIsReady(true)
        })
        .catch((err) => console.error("SW Registration failed:", err))
    }
  }, [])



  useEffect(() => {
    const video = videoRef.current

    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)

        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      {
        threshold: 0.7,
      }
    )

    observer.observe(video)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      className="
        relative min-h-screen w-full overflow-hidden
        bg-[#0d0d18] font-lexend
        [@media(max-height:500px)]:min-h-fit
      "
    >
      {/* Background Grid */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]
          bg-size-[4rem_4rem]
        "
      />

      <div
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_70%_50%,#6d7cff18,transparent_45%)]
        "
      />

      {/* Video */}
      <div className="absolute inset-0 overflow-hidden">
        { isReady && <motion.video
          ref={videoRef}
          src={"/stream?url=/vid/shiddings.mp4&size=4&total=64"}
          muted loop playsInline
          animate={{
            opacity: isVisible ? 0.85 : 0.35,
            scale: isVisible ? 1 : 1.05,
            filter: isVisible ? "blur(0px)" : "blur(10px)",
          }}
          transition={{
            opacity: {
              duration: 0.7,
              ease: [0, 0, 0.2, 1],
            },
            scale: {
              duration: 1.2,
              ease: [0, 0, 0.2, 1],
            },
          }}
          className="
            absolute inset-0
            h-full w-full
            object-cover
            object-center
          "
        /> }

        {/* Keep the left side dark for the animation */}
        <div
          className="
            absolute inset-0
            bg-linear-to-r
            from-[#0d0d18]/60
            via-transparent
            to-[#0d0d18]/90
          "
        />

        {/* Stronger fade behind the content */}
        <div
          className="
            absolute inset-y-0 right-0
            md:w-[55%] w-9/10
            bg-linear-to-l
            from-[#0d0d18]
            md:via-[#0d0d18]/80
            to-transparent
          "
        />

        {/* Bottom fade */}
        <div
          className="
            absolute inset-0
            bg-linear-to-b
            from-[#0d0d18]/10
            via-transparent
            to-[#0d0d18]/70
          "
        />

        {/* Subtle tint */}
        <div className="absolute inset-0 bg-primary/5" />
      </div>

      {/* Content */}
      <div
        className="
          relative z-10
          mx-auto flex min-h-screen max-w-7xl
          items-center justify-end
          px-6 py-24
          md:px-10
          lg:px-16
          [@media(max-height:500px)]:min-h-fit
        "
      >
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.8,
            ease: [0, 0, 0.2, 1],
          }}
          className="
            w-full
            max-w-md
            text-right
            lg:max-w-lg
          "
        >

          {/* Heading */}
          <h2
            className="
              text-5xl font-semibold
              leading-[0.95]
              tracking-[-0.04em]
              text-white
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            Have an idea?
          </h2>

          {/* Personal statement */}
          <p
            className="
              mt-8 relative md:text-right
              md:text-xl font-light
              leading-relaxed
              tracking-tight
              text-white/75 whitespace-pre-line
            "
          >
            Life is not forever, but I've got a dream {"\n"}
            so I gotta go and chase it.
          </p>

          {/* Supporting text */}
          <p
            className="
              mt-5 ml-auto
              max-w-md text-sm font-light
              leading-6 text-white/45
              md:text-base whitespace-pre-line
            "
          >
            My passion is the only thing that keeps me going {"\n"}
            Bring me ideas, weird concepts, small, anything, I'll try to make it real. If I can't build, I'll learn
          </p>

          {/* CTA */}
          <div className="mt-15 md:mt-10 flex flex-wrap justify-end gap-4">
             <a
              className="
                rounded-full
                border border-white/30
                px-6 text-sm font-light
                text-white/60
                hover:border-white/25
                hover:bg-white/5
                hover:text-white
                h-16 gap flex gap-2 items-center fill-white
              "
            >
              <svg className="size-8" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Discord</title><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
              @ocean10230
            </a>
            
            <a
              href="https://www.youtube.com/@ocean10230"
              className="
                rounded-full
                border border-white/30
                p-4
                text-sm font-light
                text-white/60
                hover:border-white/25
                hover:bg-white/5
                hover:text-white
                fill-white flex items-center
              "
            >   
              <svg role="img" className="size-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>

            <a
              href="https://github.com/ocean10230"
              className="
                rounded-full
                border border-white/30
                p-4
                text-sm font-light
                text-white/60
                hover:border-white/25
                hover:bg-white/5
                hover:text-white
                fill-white flex items-center
              "
            >   
              <svg role="img" className="size-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}