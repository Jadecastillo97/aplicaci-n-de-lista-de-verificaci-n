interface IHeaderSectionProps {
  title?: string
  description?: string
  href?: string
}
export const HeaderSection = (props: IHeaderSectionProps) => {
  const {
    description = "Sin descripcion",
    href,
    title = "Titulo de seccion"
  } = props
  return (
    <main>
      <section className="flex flex-col gap-2">
        <h1 className="font-bold">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </section>
    </main>
  )
}
