import Button from "./Button"
import Chat from "./icons/Chat"

export default function ActionButtons() {
  return (
    <div className="flex justify-center gap-x-3 md:gap-x-4 items-start font-inter px-4 md:px-0">
      <Button
        onClick={() => {
          Calendly.initPopupWidget({ url: "https://calendly.com/diegogeut/30min" })
        }}
        className="text-sm h-8 md:text-sm md:h-10 lg:text-lg lg:h-12 px-3 md:px-4"
        icon={Chat}
      >
        Book a call
      </Button>

      <Button
        variant="outline"
        href="/how-we-work"
        className="text-sm h-8 md:text-sm md:h-10 lg:text-lg lg:h-12 px-3 md:px-4"
      >
        Our Work
      </Button>
    </div>
  )
}
