import { useTitle } from "@/hooks/Title"
import { FadeIn } from "@/layout/FadeIn"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";
import ToGitAssets from "@/hooks/ToGitAssets"

const NotFound = () => {
    useTitle("Ocean - Not Found")
    
    const navigate = useNavigate()
    const [reading, setReading] = useState(false)
    const [read, setRead] = useState(false)
    const [goingBack, setGoingBack] = useState(false)

    useEffect(() => {
        if (goingBack)
            setTimeout(() => {
                navigate("/")
            }, 2000)
    }, [goingBack, navigate])

    return <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
        <FadeIn className="absolute w-full h-full object-cover">
            <video className="w-full h-full object-cover opacity-20 blur-xl" src="https://raw.githubusercontent.com/ocean10230/redesigned/master/public/assets/videos/fishin.mp4" autoPlay loop muted />
        </FadeIn>

        <FadeIn
            y={-30}
            duration={0.5}
        >
            <div className="max-w-100 border-white/10 md:border rounded-xl p-6 md:backdrop-blur-md bg-white/2 text-center">
                {
                    !read ? <>
                    
                    <h1 className="text-4xl font-bold font-inter">Mysterious page</h1>
                    <p className="text-gray-300 font-lexend mt-2 ">
                        You've stumbled into a mysterious section of the website, there's nothing beside a button below this random message.
                    </p>

                    <button
                        className="mt-5 font-lexend bg-gray-500/50 border border-white/20"
                        onClick={() => {
                            if (!reading && !read) {
                                setReading(true)
                            }
                        }}
                    >
                        Read the hidden message
                    </button>
                    
                    </> : <>
                        {
                            goingBack &&
                            <img className="w-full" src={ToGitAssets("assets/explosion.gif")} />
                        }

                        { !goingBack && <>
                            <h1 className="text-4xl font-bold font-inter">404: Not Found</h1>
                            <p className="text-gray-300 font-lexend mt-2 ">
                                You've stumbled into a mysterious message and wasted a minute of your life. This page does not exists and you've intentionally get here so it's on you
                            </p>

                            <button
                                className="mt-5 font-lexend bg-gray-500/50 border border-white/20"
                                onClick={() => {
                                    setGoingBack(true)
                                }}
                            >
                                I wanna go home
                            </button>
                        </>}
                    </>
                }
            </div>
        </FadeIn>

        {
            <AnimatePresence>
                {reading && !read && <motion.div
                    className="bg-black/50 backdrop-blur-md absolute w-full h-full flex justify-center items-center"
                >
                    <div className="max-w-120 border-white/10 md:border rounded-xl p-6 md:backdrop-blur-md bg-white/2 text-center">
                        <h1 className="text-4xl font-bold font-inter">A mysterious message..?</h1>
                        <motion.img
                            src="/assets/meme.jpeg"
                            transition={{ duration: 20, ease: "linear" }}
                            initial={{ opacity: 0, filter: "blur(50px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                        />

                        <button
                            className="mt-5 font-lexend bg-gray-500/50 border border-white/20"
                            onClick={() => {
                                if (reading && !read) {
                                    setReading(false)
                                    setRead(true)
                                }
                            }}
                        >
                            Close the message
                        </button>
                    </div>
                </motion.div>}
            </AnimatePresence>
        }
    </div>
}

export default NotFound