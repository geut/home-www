import { twMerge } from "tailwind-merge"

const NeuButton = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <div className=" min-h-[200px] flex items-center justify-center">
      <button
        className={twMerge(
          "px-6 py-2 font-medium bg-primary text-primary-content w-fit transition-all shadow-[3px_3px_0px_var(--color-secondary)] dark:shadow-[3px_3px_0px_var(--color-primary)] hover:bg-primary/50 active:shadow-none active:translate-x-[3px] active:translate-y-[3px]",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    </div>
  )
}

export default NeuButton
