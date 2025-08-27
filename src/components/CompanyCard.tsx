import { twMerge } from "tailwind-merge"
export default function CompanyCard({
  image,
  link,
  alt,
  styles = "",
}: {
  image: string
  link: string
  alt: string
  styles?: string
}) {
  return (
    <div className={twMerge("card text-primary-content w-full justify-center items-center", styles)}>
      <div className="card-body">
        <a href={link} target="_blank" rel="noreferrer">
          <img src={image} alt={alt} className="size-40" />
        </a>
      </div>
    </div>
  )
}
