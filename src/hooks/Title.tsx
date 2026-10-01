import { useEffect } from "react"

export const useTitle = (Title: string) => {
    useEffect(() => { document.title = Title }, [Title])
}