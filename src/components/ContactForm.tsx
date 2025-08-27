import Button from "./Button"

export default function ContactForm() {
  return (
    <form className="md:max-w-2xl w-full">
      <fieldset className="flex flex-col w-full items-start fieldset bg-base-200 text-base-content rounded-box border border-secondary p-4 lg:p-8">
        <legend className="fieldset-legend text-primary text-lg">Drop us a line</legend>

        <label className="label" htmlFor="email">
          Your name
        </label>
        <input type="name" id="name" className="input w-full" placeholder="Name" />

        <label className="label" htmlFor="email">
          Email
        </label>
        <input type="email" id="email" className="input w-full" placeholder="Email" />

        <label className="label" htmlFor="message">
          Message
        </label>
        <textarea id="message" className="textarea h-24 w-full" placeholder="Tell us about your project" />

        <Button type="submit" className="btn font-mono uppercase btn-primary mt-4 w-full">
          Send
        </Button>
      </fieldset>
    </form>
  )
}
