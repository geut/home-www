import { useEffect, useRef } from "react"

export default function CalendlyForm() {
  const calendlyEmbedRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    Calendly.initInlineWidget({
      url: "https://calendly.com/diegogeut/30min?hide_gdpr_banner=1&hide_event_type_details=1",
      parentElement: document.getElementById("calendly-embed"),
      title: "Geut Kickoff Call",
      color: "#091FFC",
      backgroundColor: "#091FFC",
    })
  }, [])

  return (
    <div
      ref={calendlyEmbedRef}
      className=" max-h-[450px] md:max-h-[620px] w-[100%] lg:w-[650px] rounded-lg"
      id="calendly-embed"
      style={{ minWidth: "320px", height: "100%", borderRadius: "8px" }}
    />
  )
}
