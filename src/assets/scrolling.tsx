import { useEffect, useState } from "react";

export default function ScrollValue() {
    const [scroll,setScroll] = useState(window.scrollY)

    useEffect(() => {
        const handleScroll = () => setScroll(window.scrollY)

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return scroll
}