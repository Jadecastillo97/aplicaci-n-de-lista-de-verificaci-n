import { ISystem } from "@/types"

interface ISystemListProps {
  data: ISystem[]
}

export const SystemList = (props: ISystemListProps) => {
  const { data } = props

  return (
    <main>
      <h1>System List</h1>
      <ul>
        {data.map((system) => (
          <li key={system.id}>
            <h2>{system.name}</h2>
            <p>{system.description}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
