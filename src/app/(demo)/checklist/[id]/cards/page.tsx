import { fetchTaskListById, fetchTasksByTaskListDetailsId } from "@/api"
import { ContentLayout } from "@/components/admin-panel/content-layout"
import { DetailsTaskList, TaskListPage } from "@/modules/checkList"
import { ITaskDetail, ITasksList } from "@/types"
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  let taskListData: ITasksList | null = null
  let tasksData: ITaskDetail[] = []

  try {
    const { tasksList } = await fetchTaskListById(id)
    taskListData = tasksList
  } catch (error) {
    console.error(error)
  }

  try {
    const { tasks } = await fetchTasksByTaskListDetailsId(id)
    if (tasks) {
      tasksData = tasks
    } else {
      tasksData = []
    }
  } catch (error) {
    console.error(error)
  }

  return (
    <ContentLayout title="Detalle de checklist diario">
      {taskListData && <DetailsTaskList data={taskListData} />}
      <section className="mt-4">
        <TaskListPage data={tasksData} />
      </section>
    </ContentLayout>
  )
}
