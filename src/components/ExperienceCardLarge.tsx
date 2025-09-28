import {
	motion,
	useAnimation,
	useMotionValue,
	useTransform,
} from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Iso } from "./Iso";
import Check from "./icons/Check";
import ExternalLink from "./icons/ExternalLink";

export default function ExperienceCardLarge({
	id,
	activeId,
	image,
	alt,
	link,
	styles = "",
	work,
	cards,
	setCards,
	move,
}: {
	id: number;
	activeId: number;
	image: string;
	alt: string;
	link: string;
	styles?: string;
	work: string[];
	cards: any[];
	setCards: any;
	move: number;
}) {
	const translateX = `-${move}%`;
	const translateZ = "0px";

	return (
		<motion.div
			id={`slide-${id}`}
			className="relative mx-2 w-[500px] bg-primary/70 backdrop-blur-xl rounded-tr-none card shrink-0 hover:cursor-grab active:cursor-grabbing h-[26rem]  origin-bottom shadow-xl 
      after:content-none after:absolute after:left-[-3em] after:border-primary/50 after:border-4 after:rounded-none after:rotate-6"
			style={{
				transition: "0.150s transform",
			}}
			animate={{
				x: translateX,
				z: translateZ,
			}}
		>
			<div className="flex absolute -top-8 right-0">
				<div className="h-8 w-40 bg-primary/80 border-2 border-b-0 z-20 border-primary/10  font-mono text-2xl text-accent px-2 rounded-t-lg" />
			</div>

			{/* <div className="absolute inset-0 bg-primary/70 rounded-none rotate-6 border-primary/50 border-4" /> */}
			<div className="relative">
				<figure className="shrink p-4">
					{image ? (
						<img
							src={image}
							alt={alt}
							style={{ objectFit: "contain" }}
							className={twMerge(
								"object-contain rounded-lg object-center w-full h-48 p-12",
								styles,
							)}
						/>
					) : (
						<Iso
							className={twMerge(
								"object-contain w-full rounded-lg h-48 p-12 text-primary ",
								styles,
							)}
						/>
					)}
				</figure>

				<div className="card-body w-full bg-curl-card bg-clip-padding bg-no-repeat bg-size-[500px_auto] shrink-0 h-56 flex-1 flex flex-col rounded-b-lg justify-start lg:px-10 text-primary-content">
					<h3 className="card-title font-mono tracking-wide text-2xl lg:text-4xl mb-2 group cursor-pointer">
						<a
							href={link}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 justify-between w-full"
						>
							{alt}
							<ExternalLink className=" size-8 transition-all ease-in transition-discrete duration-150 group-hover:size-10" />
						</a>
					</h3>
					<ul className="list-none">
						{work.map((item, idx) => (
							<li className="flex gap-2 items-center" key={`${item}-${idx}`}>
								<Check className="w-4 h-4 stroke-accent" />
								<pre className="whitespace-pre-wrap font-mono uppercase">
									{item}
								</pre>
							</li>
						))}
					</ul>
				</div>
			</div>
		</motion.div>
	);
}
