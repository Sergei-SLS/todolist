import {FilterValues, Task, Todolist} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";

type Props = {
    todolist: Todolist
    tasks: Task[]
    date?: string
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
}

export const TodoListItem = ({todolist:{id, title, filter},
                                 tasks,
                                 date,
                                 deleteTask,
                                 deleteTodolist,
                                 changeFilter,
                                 createTask,
                                 changeTaskStatus}: Props) => {

    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id,filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    return (
        <div>
            <h3>
                <CreateItemForm onCreateItem={createTaskHandler}/>
                {title}
                <Button title={'❌'} onClick={deleteTodolistHandler}/>
            </h3>

            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(id, task.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(id, task.id, newStatusValue)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={changeTaskStatusHandler}/>
                                <span>{task.title}</span>
                                <Button title={'❌'} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <Button className={filter === 'all' ? 'active-filter': ''}
                        title={'All'}
                        onClick={() => changeFilterHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilterHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilterHandler('completed')}/>
            </div>
            <div>{date}</div>
        </div>
    )
}