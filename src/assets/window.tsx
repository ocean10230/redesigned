import { Rnd } from "react-rnd"

const Window = ({ title, children, onClose }: { 
  title: string
  children: React.ReactNode
  onClose?: () => void 
}) => (
  <Rnd
    default={{ x: 100, y: 100, width: 480, height: 320 }}
    minWidth={300}
    minHeight={200}
    dragHandleClassName="titlebar"
    style={{ zIndex: 100 }}
  >
    <div className="flex flex-col overflow-hidden w-full h-full bg-[rgba(32,32,32,0.85)] backdrop-saturate-150 backdrop-blur-3xl rounded-md" style={{
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 32px 64px rgba(0,0,0,0.4)",
    }}>

      {/* titlebar */}
      <div className="titlebar flex justify-between select-none rounded-md overflow-hidden">
        <span>{title}</span>

        {/* win11 traffic lights */}
        <div style={{ display: "flex", gap: "2px" }}>
          {[
            { label: "─", action: undefined },
            { label: <>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
                preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
                fill="#fff" stroke="none">
                <path d="M646 1814 c-13 -13 -16 -42 -16 -160 l0 -144 50 0 50 0 0 110 0 110
                535 0 535 0 0 -535 0 -535 -181 0 -180 0 3 -47 3 -48 211 0 c164 0 215 3 227
                14 16 12 17 68 17 613 0 394 -4 606 -10 619 -10 18 -28 19 -620 19 -540 0
                -610 -2 -624 -16z"/>
                <path d="M130 1427 l-25 -13 -3 -602 c-1 -404 1 -609 8 -623 10 -19 26 -19
                620 -19 540 0 610 2 624 16 14 14 16 83 16 613 0 500 -2 600 -14 617 -14 18
                -33 19 -608 21 -465 2 -598 0 -618 -10z m1138 -624 l2 -533 -535 0 -535 0 0
                535 0 535 533 -2 532 -3 3 -532z"/>
                </g>
            </svg>
            </>, action: undefined },
            { label: "✕", action: onClose },
          ].map(({ label, action }) => (
            <button key={crypto.randomUUID()} onClick={action} style={{
              width: 46, height: 32,
              background: "transparent",
              border: "none",
              color: "rgba(255,255,255,0.7)",
              fontSize: 12,
              cursor: "pointer",
              borderRadius: label === "✕" ? "0 8px 0 0" : 0,
              transition: "background .15s",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "0 16px",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = label === "✕" ? "#c42b1c" : "rgba(255,255,255,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* content */}
      <div className="windowapp" style={{
        flex: 1,
        overflow: "auto",
        color: "rgba(255,255,255,0.85)",
      }}>
        {children}
      </div>

    </div>
  </Rnd>
)

export default Window