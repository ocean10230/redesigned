import { FadeIn } from "@/layout/fadein"
import { useState } from "react"

const Button = () => {
  const defaultText = "60 subscribers"
  const [text, setText] = useState(defaultText)
  
  return <button
    className="bg-primary/60 mt-2 w-35 relative"
    onMouseEnter={() => setText("Subscribe")}
    onMouseLeave={() => setText(defaultText)}
    onClick={() => window.open("https://youtube.com/@ocean10230?sub_confirmation=1")}
  >
    {text}
  </button>
}

const techStack: [string, string[]?][] = [
  [
      "Animation", [
          "/assets/icons/blender.webp",
          "/assets/icons/flipaclip.jpg",
          "/assets/icons/an.png",
          "/assets/icons/sticknodes.png"
      ]
  ],
  [
      "Frontend", [
          "/assets/icons/react.webp",
          "/assets/icons/tailwind.jpg",
          "/assets/icons/vue.png"
      ]
  ],
  [
      "Backend", [
          "/assets/icons/node.png",
          "/assets/icons/python.webp"
      ]
  ],
  [
      "Coding", [
          "/assets/icons/javascript.png",
          "/assets/icons/typescript.svg",
          "/assets/icons/python.webp",
          "/assets/icons/cpp.webp"
      ]
  ]
]

const TechStackComponent = () => {
  let i = 0
  return techStack.map((item) => (
      <div key={item[0]} className="w-full flex justify-between overflow-hidden">
          <FadeIn delay={i++ * 0.035} x={-50}>
              <span>{item[0]}</span>
          </FadeIn>

          <div className="flex gap-2 items-center">
              {item[1]?.map((icon) => (
                  <FadeIn key={icon} delay={i++ * 0.035} x={-50}>
                      <img src={icon} className="w-8 rounded-md" />
                  </FadeIn>
              ))}
          </div>
      </div>
  ))
}

const ANIM_SPACING = 0.1

const TextColumn = () => {
  const [card_count, set_card_count] = useState(0)
  const [animating, set_animating] = useState(false)

  const paragraphs = [
    "My online identity is Ocean, a solo developer and animator with a strong curiosity for understanding how systems work beneath the surface. I enjoy taking things apart, exploring how they function, and rebuilding them into something more refined, efficient, and practical.",

    "I work across both frontend and backend development, primarily using TypeScript, while also pursuing animating, stick figures and ROBLOX animation. I enjoy working across different disciplines, whether that's designing software, writing application logic, or experimenting with animation, and finding ways to bring those skills together into sigma projects.",

    "Although I'm not in college or have a job yet, my passion for coding and UI/UX design will never end (unless some clankers take my job later in life).",
  ]

  /*
   * 0 = heading
   * 1-3 = paragraphs
   * 4 = stats
   */
  const ITEM_COUNT = paragraphs.length + 2
  const LAST_ITEM = ITEM_COUNT - 1

  return (
    <>
      {/* Heading */}
      <FadeIn
        y={-25}
        delay={
          0.1 +
          Math.abs(0 - (animating ? card_count : 0)) * ANIM_SPACING
        }
        ease={[0, 0, 0, 1]}
        start={() => {
          set_card_count(0)
          set_animating(true)
        }}
        complete={() => {
          set_animating(true)
        }}
      >
        <h2 className="font-lexend text-4xl font-medium leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Crafting interactive{" "}
          <span className="text-bright-primary">
            digital tools
          </span>{" "}
          & utilities.
        </h2>
      </FadeIn>

      {/* Paragraphs */}
      <div className="space-y-4 font-light font-lexend leading-relaxed text-base text-gray-300 sm:text-lg">
        {paragraphs.map((text, index) => {
          const i = index + 1

          return (
            <FadeIn
              key={i}
              y={-25}
              delay={
                0.1 +
                Math.abs(i - (animating ? card_count : 0)) *
                  ANIM_SPACING
              }
              ease={[0, 0, 0, 1]}
              start={() => {
                set_card_count(i)
                set_animating(true)
              }}
              complete={() => {
                if (i === LAST_ITEM) {
                  set_animating(false)
                } else {
                  set_animating(true)
                }
              }}
            >
              <p>{text}</p>
            </FadeIn>
          )
        })}
      </div>

      {/* Quick Stats */}
      <FadeIn
        y={-25}
        delay={
          0.1 +
          Math.abs(
            LAST_ITEM - (animating ? card_count : 0)
          ) *
            ANIM_SPACING
        }
        ease={[0, 0, 0, 1]}
        className="grid grid-cols-3 gap-4 border-t border-white/30 pt-6"
        start={() => {
          set_card_count(LAST_ITEM)
          set_animating(true)
        }}
        complete={() => {
          set_animating(false)
        }}
      >
        <div>
          <div className="font-lexend text-3xl font-bold text-white">
            3+
          </div>

          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-gray-500">
            Years Experience
          </div>
        </div>

        <div>
          <div className="font-lexend text-3xl font-bold text-white">
            5
          </div>

          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-gray-500">
            Projects
          </div>
        </div>

        <div>
          <div className="font-lexend text-3xl font-bold text-white">
            1.45k+
          </div>

          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-gray-500">
            Bugs introduced
          </div>
        </div>
      </FadeIn>
    </>
  )
}

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 text-white overflow-hidden font-sans border-t border-white/5 bg-background">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-0 size-125 bg-bright-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff09_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[3.5rem_3.5rem] pointer-events-none"
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section HUD Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="w-2 h-2 rounded-full bg-bright-primary" />
          <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
            About me
          </span>
        </div>

        {/* Main Grid: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Big Philosophy Statement & Bio */}
          <div className="lg:col-span-7 space-y-6">
            <TextColumn/>
          </div>

          {/* Right Column: Tech Stack & System Specs Card */}
          <div className="lg:col-span-5 space-y-4 bg-gray-950/10">
            
            {/* HUD Card Container */}
            <div className="rounded-2xl border border-white/10 bg-gray-950/10 p-6 backdrop-blur-md space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-lexend text-xs uppercase tracking-wide text-gray-400">
                  // Stack & Capabilities
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-bright-primary animate-pulse" />
              </div>

              {/* Stack List */}
              <div className="space-y-3">
                <TechStackComponent/>
              </div>

              {/* Status Footer */}
              <FadeIn className="pt-2">
                <div className="p-3 rounded-xl bg-bright-primary/10 border border-bright-primary/20 flex items-center justify-between">
                  <span className="font-lexend text-sm text-bright-primary">
                    Focus: Extension Developer
                  </span>
                </div>
              </FadeIn>

            </div>

            {/* Channel */}
            <div className="rounded-2xl border border-white/10 bg-gray-950/10 p-6 backdrop-blur-md space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-lexend text-xs uppercase tracking-wide text-gray-400">
                  Consider supporting
                </span>
              </div>

              <div className="space-y-3 flex gap-3">
                <img src="/assets/icons/channel.jpg" className="size-24 rounded-full" />
                <div>
                  <p className="text-2xl leading-6 mt-1.5 font-lexend font-medium">Ocean</p>
                  <p className="tracking-tight font-inter">@ocean10230 · animating</p>
                  <Button />
                </div>
              </div>

              <FadeIn className="pt-2">
                <div className="p-3 rounded-xl bg-bright-primary/10 border border-bright-primary/20 flex items-center gap-2">
                  <span>
                      <span className="font-lexend text-sm text-bright-primary">
                      Note:
                    </span>
                    {" "}
                    school is super duper overwhelming so don't expect much from me
                  </span>
                </div>
              </FadeIn>

            </div>


          </div>

        </div>

      </div>
    </section>
  )
}