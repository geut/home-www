import { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import Button from "./Button"
import Chat from "./icons/Chat"
import Mail from "./icons/Mail"
import Team from "./icons/Team"
import Work from "./icons/Work"

const BookingButton = () => {
  useEffect(() => {
    ;(async () => {
      try {
        const cal = await getCalApi({ namespace: "30min" })

        cal("ui", {
          cssVarsPerTheme: {
            light: { "cal-brand": "#03005B" },
            dark: { "cal-brand": "#091FFC" },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        })
      } catch (_) {
        // use a mailto link with subject "Book a call"
        window.location.href =
          "mailto:contact@geutstudio.com?subject=Book a call"
      }
    })()
  }, [])

  return (
    <Button
      className="text-sm md:text-xl lg:text-3xl w-full font-normal bg-primary/80 uppercase flex items-center justify-center backdrop-blur-sm rounded-r-none"
      icon={Chat({ className: "stroke-base-100 size-4 md:size-6" })}
      dataCalNamespace="30min"
      dataCalLink="diegogeut/30min"
      dataCalHideEventTypeDetails={false}
      dataCalConfig='{"layout": "month_view"}'
    >
      Book
    </Button>
  )
}

const ContactButton = () => {
  return (
    <Button
      className="text-sm md:text-xl lg:text-3xl w-full font-normal uppercase flex items-center justify-center backdrop-blur-sm border-0 border-primary"
      icon={Mail({ className: "stroke-primary size-4 md:size-6" })}
      href="/contact"
      variant="outline"
    >
      Contact
    </Button>
  )
}

const WorkButton = () => {
  return (
    <Button
      icon={Work({ className: "stroke-primary size-4 md:size-6" })}
      variant="outline"
      href="/our-work"
      className="text-sm md:text-xl lg:text-3xl w-full font-normal uppercase flex items-center justify-center backdrop-blur-sm border-0"
    >
      Work
    </Button>
  )
}

const TeamButton = () => {
  return (
    <Button
      icon={Team({ className: "stroke-primary size-4 md:size-6" })}
      variant="outline"
      href="/team"
      className="text-sm md:text-xl lg:text-3xl w-full font-normal uppercase flex items-center justify-center backdrop-blur-sm border-0"
    >
      Team
    </Button>
  )
}

const actionButtons: actionButtons = {
  booking: {
    component: BookingButton,
  },
  work: {
    component: WorkButton,
  },
  contact: {
    component: ContactButton,
  },
  team: {
    component: TeamButton,
  },
}

export interface actionKeys {
  booking: "booking"
  work: "work"
  contact: "contact"
  team: "team"
}

export interface actionButtons {
  [key: string]: {
    component: () => React.ReactNode
  }
}

export default function ActionButtons({ actions }: { actions: actionKeys[] }) {
  return (
    <div className="flex w-full rounded-full border border-primary max-w-xl mx-auto justify-center items-stretch font-mono shadow-lg">
      {actions.map((action) => {
        return actionButtons[action]?.component?.() || null
      })}
    </div>
  )
}
