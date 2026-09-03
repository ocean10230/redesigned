export default function Footer({ merge }: { merge: boolean }) {
    return <>
        <div
            style={{ position: merge ? "absolute" : "relative", bottom: 0, left: 0, right: 0 }}
            className={"footer p-5 " + (!merge ? "border-t border-bright-primary/50 bg-bright-primary/10 p-2 text-right" : "text-gray-400/50")}
        >
            <span>© {new Date().getFullYear()} Ocean10230 – All rights deserved</span>
        </div>
    </>
}