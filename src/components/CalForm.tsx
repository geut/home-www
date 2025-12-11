import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect, useRef } from "react"

export default function CalendlyForm() {
  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace: "30min" })
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#03005B" },
          dark: { "cal-brand": "#091FFC" },
        },
        hideEventTypeDetails: true,
        layout: "month_view",
      })
    })()
  }, [])

  return (
    <div
      key="cal-form"
      className=" w-full bg-base-300 lg:bg-transparent h-full no-scrollbar overflow-hidden rounded-lg border border-info lg:border-none"
      style={{
        position: "relative",
        minHeight: "400px",
        maxHeight: "50vh",
      }}
    >
      <div className="w-full h-full">
        <Cal
          namespace="30min"
          calLink="diegogeut/30min"
          style={{
            width: "100%",
            height: "100%",
            minHeight: "400px",
            overflow: "scroll",
          }}
          config={{ layout: "month_view" }}
        />
      </div>
    </div>
  )
}
