import { useCallback, useEffect, useState } from "react";

import ExperienceCardLarge from "./ExperienceCardLarge";
import ExperienceCardStacked from "./ExperienceCardStacked";
import LeftArrow from "./icons/LeftArrow";
import RightArrow from "./icons/RightArrow";

export interface Experience {
	id: number;
	image: string;
	alt: string;
	link: string;
	styles: string;
	work: string[];
}

const experience = [
	{
		id: 1,
		image: "/images/alliants.svg",
		alt: "Alliants",
		link: "https://www.alliants.com/",
		styles: "bg-white",
		work: ["Fullstack", "API Design", "Custom Tooling", "Staff Augmentation"],
	},
	{
		id: 2,
		image: "/images/asa.svg",
		alt: "ASA",
		link: "https://www.asa.org/",
		styles: "bg-[#09163b]",
		work: ["Fullstack", "Performance"],
	},
	{
		id: 3,
		image: "/images/loamist.svg",
		alt: "Loamist",
		link: "https://www.loamist.com/",
		styles: "bg-[#121212]",
		work: ["Fullstack", "API Design", "AI Integration", "Custom Tooling"],
	},
	{
		id: 4,
		image: "",
		alt: "Geut OS",
		link: "https://github.com/geut",
		styles: "bg-white",
		work: ["P2P", "Libraries", "Fullstack", "Tooling"],
	},
];

export default function Experience() {
	const [activeId, setActiveId] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [isLargeScreen, setIsLargeScreen] = useState(false);
	const [cards, setCards] = useState(experience);

	// Check screen size
	useEffect(() => {
		const checkScreenSize = () => {
			setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);
		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	const goToPrevSlide = useCallback(() => {
		if (isTransitioning) return;

		setIsTransitioning(true);

		// activeId moves 2 by 2
		setActiveId(activeId - 1 > 0 ? activeId - 1 : 0);

		setTimeout(() => setIsTransitioning(false), 300);
	}, [isTransitioning, activeId]);

	const goToNextSlide = useCallback(() => {
		if (isTransitioning) return;

		setIsTransitioning(true);

		// activeId moves 2 by 2
		setActiveId(activeId + 1 < cards.length ? activeId + 1 : cards.length - 1);

		setTimeout(() => setIsTransitioning(false), 300);
	}, [isTransitioning, activeId, cards]);

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") {
				event.preventDefault();
				goToPrevSlide();
			} else if (event.key === "ArrowRight") {
				event.preventDefault();
				goToNextSlide();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [goToPrevSlide, goToNextSlide]);

	if (isLargeScreen) {
		return (
			<div className="no-scrollbar overflow-hidden relative w-full ">
				<div className="overflow-hidden gap-6 max-w-7xl mx-auto">
					{/* Navigation buttons */}
					<div className="flex ml-2 w-full items-center justify-start h-20">
						<button
							type="button"
							onClick={goToPrevSlide}
							className="z-20 mr-6 btn dark:fill-info hover:fill-base-100 hover:btn-primary transition-all duration-200 disabled:opacity-50"
							aria-label="Previous slide"
						>
							<LeftArrow className="w-4 h-4 stroke-2" />
						</button>
						<button
							type="button"
							onClick={goToNextSlide}
							className=" z-20 btn dark:fill-info hover:fill-base-100 hover:btn-primary transition-all duration-200 disabled:opacity-50"
							aria-label="Next slide"
						>
							<RightArrow className="w-4 h-4 stroke-2" />
						</button>
					</div>
					<div className="flex gap-6">
						{experience.map((item, index) => (
							<div
								key={`grid-${item.id}`}
								className="flex transform transition-all duration-150"
							>
								<ExperienceCardLarge
									id={item.id}
									activeId={activeId}
									move={index >= activeId ? activeId * 100 : index * 100}
									image={item.image}
									alt={item.alt}
									link={item.link}
									styles={item.styles}
									work={item.work}
									cards={cards}
									setCards={setCards}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="relative w-full h-full items-center flex md:max-w-xl">
			<ul className="bg-transparent w-full grid place-items-center">
				{cards.map((item) => (
					<ExperienceCardStacked
						id={item.id}
						key={`experience-${item.id}`}
						image={item.image}
						alt={item.alt}
						link={item.link}
						styles={item.styles}
						work={item.work}
						cards={cards}
						setCards={setCards}
					/>
				))}
			</ul>
		</div>
	);
}
