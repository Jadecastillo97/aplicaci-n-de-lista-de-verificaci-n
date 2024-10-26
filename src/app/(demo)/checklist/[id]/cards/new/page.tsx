import { fetchTaskListById, fetchTasksByTaskListId } from "@/api"
import { ContentLayout } from "@/components/admin-panel/content-layout"
import { DetailsTaskList, FrmTaskEditor } from "@/modules/checkList"
import { ITask, ITasksList } from "@/types"

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  let taskListData: ITasksList | null = null
  //   let tasksData: ITask[] = []

  try {
    const { tasksList } = await fetchTaskListById(id)
    taskListData = tasksList
  } catch (error) {
    console.error(error)
  }

  //   try {
  //     const { tasks } = await fetchTasksByTaskListId(id)
  //     if (tasks) {
  //       tasksData = tasks
  //     } else {
  //       tasksData = []
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }

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
          //   dataTask={tasksData}
        />
      </section>
    </ContentLayout>
  )
}
