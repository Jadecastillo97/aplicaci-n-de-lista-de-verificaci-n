import { fetchTaskListById, fetchTasksByTaskListId } from "@/api"
import { ContentLayout } from "@/components/admin-panel/content-layout"
import { DetailsTaskList, FrmTaskEditor } from "@/modules/checkList"
import { ITask, ITasksList } from "@/types"

interface IProps {
  params: {
    id: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params
  const { searchParams } = props

  const { system_id } = searchParams

  let taskListData: ITasksList | null = null
  let tasksData: ITask[] = []

  try {
    const { tasksList } = await fetchTaskListById(id)
    taskListData = tasksList
  } catch (error) {
    console.error(error)
  }

  if (system_id) {
    try {
      const { tasks } = await fetchTasksByTaskListId(id)
      if (tasks) {
        tasksData = tasks
      } else {
        tasksData = []
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ContentLayout title="Agregar tarjeta">
      {taskListData && (
        <DetailsTaskList
          data={taskListData}
          hiddenActions
        />
      )}
      <section>
        <FrmTaskEditor
          dataTaskListId={id}
          idSystem={String(system_id)}
          {...(system_id && { dataTask: tasksData })}
        />
      </section>
    </ContentLayout>
  )
}
