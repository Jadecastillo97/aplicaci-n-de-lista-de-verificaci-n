import { fetchTaskListById } from "@/api"
import { ContentLayout } from "@/components/admin-panel/content-layout"
import { DetailsTaskList } from "@/modules/checkList"
import { ITasksList } from "@/types"
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  let taskListData: ITasksList | null = null

  try {
    const { tasksList } = await fetchTaskListById(id)
    taskListData = tasksList
  } catch (error) {
    console.error(error)
  }

  return (
    <ContentLayout title="Detalle de checklist diario">
      {taskListData && <DetailsTaskList data={taskListData} />}
    </ContentLayout>
  )
}
