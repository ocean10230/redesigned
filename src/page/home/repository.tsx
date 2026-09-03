import { ArrowUpRight, BookOpen, HardDrive, RefreshCcw, Star, User } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const TextColumn = () => {
  return (
    <>
      <h2 className="font-lexend text-4xl font-medium leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
        Home of{" "}
        <span className="text-bright-primary">
          the creativity
        </span>
      </h2>

      <div className="space-y-4 font-lexend font-light text-base text-gray-300 leading-relaxed sm:text-lg">
        <p>
          My GitHub repository is where ideas turn into execution. Explore open-source experiments, 
          full-stack applications, and architectural patterns built with performance in mind.
        </p>

        <p>
          Even though most of the projects are private and not many people knows about me but some are available for public use
        </p>
      </div>
    </>
  )
}


export default function RepositorySection() {
  const [repos, set_repos] = useState<null | GithubRepositoriesResponse[] | false>(null)
  const [refresh, set_refresh] = useState(0)

  useEffect(() => {(async () => {
    const res = await fetch("https://api.github.com/users/ocean10230/repos")
    if (!res.ok) set_repos(false)
    const json = await res.json()
    set_repos(json as GithubRepositoriesResponse[])
  })()}, [refresh])

  return (
    <section 
      id="repos" 
      className="relative min-h-screen py-24 md:py-32 text-white overflow-hidden font-lexend border-t border-white/5 bg-background flex items-center"
    >
      {/* Ambient Glow using --color-bright-primary */}
      <div className="absolute top-1/2 left-[70%] -translate-y-1/2 size-125 bg-bright-primary/10 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[3.5rem_3.5rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full">
        {/* HUD Badge */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-bright-primary animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-gray-300">
            Github Page
          </span>
        </div>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center h-fit">
          <div className="lg:col-span-7 space-y-6 h-full">
            <TextColumn />

            <p className="text-xl">Featured project:</p>

            <div className="bg-background/50 backdrop-blur-3xl p-3 rounded-md border-white/20 border flex flex-col gap-1">
              <div className="w-full flex gap-3">
                <img src="/public/assets/icons/feather.png" className="size-18" />
                <div className="font-lexend font-light">
                  <p className="font-poppins font-medium text-2xl">Feather</p>
                  <p className="leading-5">An absurdly small Microsoft Rewards automator that silently completes your daily task every day.</p>
                  <p className="text-xs text-gray-500">not affiliated with microsoft</p>
                </div>
              </div>

              <div className="flex gap-5 font-light items-center mt-2 text-gray-300/50 p-2 pt-0">
                    <div className="flex gap-2 items-center">
                      <span className="size-1.5 bg-bright-primary rounded-full" />
                      <span>Typescript</span>
                    </div>

                    <div className="hidden md:flex gap-2 items-center">
                      <HardDrive className="size-4 text-bright-primary"/>
                      <span>~20kb compiled</span>
                    </div>

                    <div onClick={() => window.open("https://github.com/ocean10230/feather")} className="flex gap-2 items-center cursor-pointer hover:text-bright-primary">
                      <ArrowUpRight className="size-4 text-bright-primary" />
                      <span className="hidden md:inline">View repository</span>
                      <span className="inline md:hidden">View</span>
                    </div>

                    {
                      (() => {
                        

                        return <a className="relative flex gap-2 items-center cursor-default">
                          <User className="size-4 text-bright-primary" />
                          <span>Join testing</span>
                            <motion.div
                              className="w-100 text-gray-300 z-50 absolute -left-9/10 top-0 bg-background/50 p-5 border border-bright-primary/50 pointer-events-auto"
                              initial={{ y: 0, opacity: 0 }}
                              animate={{ y: 0, opacity: 0 }}
                              whileHover={{ y: 20, opacity: 1 }}
                              transition={{
                                ease:[0,0,0,1],duration:0.6
                              }}
                            >
                              <p>Feather is missing testers. If you're a user, please consider contributing to make this project better. Thanks!</p>
                            </motion.div>
                        </a>
                      })()
                    }
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 w-full">
            <div className="bg-background/50 backdrop-blur-3xl p-3 rounded-md border-white/20 border flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span>My repositories {":)"}</span>
                <button className="flex gap-2 items-center" disabled={!Array.isArray(repos)} onClick={() => set_refresh(prev => prev + 1)}>
                  <RefreshCcw className="size-4" /> Refresh
                </button>
              </div>

              {
                repos && (repos.slice(0,3).map((repo) => <div key={repo.full_name} className="relative group rounded-2xl border border-white/10 bg-white/2 p-6 backdrop-blur-md transition-colors duration-150 hover:border-bright-primary/40 hover:bg-white/4">
                  <div className="leading-7 mb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center"><BookOpen className="size-6 text-bright-primary" /> {repo.name}</div>
                      <div className="flex gap-2 items-center">
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-bright-primary/10 text-bright-primary border border-bright-primary/20">
                          { repo.private ? "Private" : "Public" }
                        </span>
                        { repo.archived && <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-300/10 text-amber-300/80 border border-amber-300/20">Archived</span> }
                      </div>
                    </div>
                    <span className="font-light text-gray-400">{repo.description}</span>
                  </div>

                  <div className="flex flex-wrap gap-6 items-center text-sm text-gray-400">
                    <div className="flex gap-2 items-center">
                      <span className="size-1.5 bg-bright-primary rounded-full" />
                      <span>{repo.language}</span>
                    </div>

                    <div className="flex gap-2 items-center">
                      <Star className="size-4" />
                      <span>{repo.stargazers_count}</span>
                    </div>

                    <div onClick={() => window.open("https://github.com/" + repo.full_name)} className="flex gap-2 items-center cursor-pointer hover:text-bright-primary">
                      <ArrowUpRight className="size-4" />
                      <span>Visit repository</span>
                    </div>
                  </div>
                </div>))
              }

              <div onClick={() => window.open("https://github.com/ocean10230/")} className="flex items-center gap-2 cursor-pointer relative group rounded-2xl border border-white/10 bg-white/2 p-6 backdrop-blur-md transition-colors duration-150 hover:border-bright-primary/40 hover:bg-white/4">
                <div className="size-10 p-2 rounded-md bg-bright-primary/10 text-bright-primary border border-bright-primary/20">
                  <ArrowUpRight/>
                </div>
                <div>
                  <p>Explore more repositories</p>
                  <p className="text-sm font-light leading-4.75">Why not check you my other projects if i work hard on them every single day?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}