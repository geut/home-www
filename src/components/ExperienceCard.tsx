import { Image } from "astro:assets"
import { twMerge } from "tailwind-merge"
import Check from "./icons/Check"
import { Iso } from "./Iso"
import ExternalLink from "./icons/ExternalLink"

export default function ExperienceCard({
  id,
  image,
  alt,
  link,
  styles = "",
  work,
}: {
  id: number
  image: string
  alt: string
  link: string
  styles?: string
  work: string[]
}) {
  return (
    <div id={`slide-${id}`} className="carousel-item bg-white mx-2 w-full card border border-info rounded-lg">
      <figure className="p-4 bg-white">
        {image ? (
          <img
            src={image}
            alt={alt}
            style={{ objectFit: "contain" }}
            className={twMerge("object-contain rounded-lg object-center w-full h-48 p-12", styles)}
          />
        ) : (
          <Iso className={twMerge("object-contain w-full h-48 p-12 text-primary ", styles)} />
        )}
      </figure>

      <div className="card-body bg-primary dark:bg-secondary rounded-b-lg justify-start lg:px-10 text-info-content">
        <h2 className="card-title tracking-wide w-full text-xl lg:text-2xl mb-2 group cursor-pointer">
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            {alt}
            <ExternalLink className="size-4 text-accent transition-all ease-in transition-discrete duration-150 group-hover:size-6" />
          </a>
        </h2>
        <ul className="list-none text-primary-content">
          {work.map((item, idx) => (
            <li className="flex gap-2 items-center" key={`${item}-${idx}`}>
              <Check className="w-4 h-4" />
              <pre className="whitespace-pre-wrap">{item}</pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
