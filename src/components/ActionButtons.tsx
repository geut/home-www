import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import Button from "./Button";
import Chat from "./icons/Chat";
import Mail from "./icons/Mail";
import Work from "./icons/Work";

const BookingButton = () => {
	useEffect(() => {
		(async () => {
			try {
				const cal = await getCalApi({ namespace: "30min" });

				cal("ui", {
					cssVarsPerTheme: {
						light: { "cal-brand": "#03005B" },
						dark: { "cal-brand": "#091FFC" },
					},
					hideEventTypeDetails: false,
					layout: "month_view",
				});
			} catch (_) {
				// use a mailto link with subject "Book a call"
				window.location.href =
					"mailto:contact@geutstudio.com?subject=Book a call";
			}
		})();
	}, []);

	return (
		<Button
			className="text-lg w-full font-bold flex items-center justify-center border-4 border-primary lg:text-2xl px-3 md:px-4 rounded-none"
			icon={Chat({ className: "stroke-base-100 size-4 md:size-6" })}
			dataCalNamespace="30min"
			dataCalLink="diegogeut/30min"
			dataCalHideEventTypeDetails={false}
			dataCalConfig='{"layout": "month_view"}'
		>
			Book a call
		</Button>
	);
};

const ContactButton = () => {
	return (
		<Button
			className="text-lg w-full font-bold flex items-center justify-center bg-base-100 border-4 border-primary lg:text-2xl px-3 md:px-4 rounded-none"
			icon={Mail({ className: "stroke-primary size-4 md:size-6" })}
			href="/contact"
			variant="outline"
		>
			Contact
		</Button>
	);
};

const WorkButton = () => {
	return (
		<Button
			icon={Work({ className: "stroke-primary size-4 md:size-6" })}
			variant="outline"
			href="/our-work"
			className="text-lg w-full font-bold flex items-center justify-center bg-base-100 border-4 lg:text-2xl px-3 md:px-4 rounded-none"
		>
			Our Work
		</Button>
	);
};

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
};

export interface actionKeys {
	booking: "booking";
	work: "work";
	contact: "contact";
}

export interface actionButtons {
	[key: string]: {
		component: () => React.ReactNode;
	};
}

export default function ActionButtons({ actions }: { actions: actionKeys[] }) {
	return (
		// make them 2 giant buttons ocuppying the full width of the screen

		<div className="flex w-full max-w-7xl mx-auto justify-center items-start font-mono">
			{actions.map((action) => {
				return actionButtons[action]?.component?.() || null;
			})}
		</div>
	);
}
