import Task from "./Task"
import { useContext } from "react"
import DataContext from "../context/DataContext"

const Tasks = () => {
    const {tasks, onDelete, toggleReminder} = useContext(DataContext)
    
    return (
        <>
            {
                tasks.map((task) => (
                    <Task  key = {task.id} task = {task} onDelete = {onDelete} toggleReminder = {toggleReminder}/>
                ))
            }
        </>
    )
}

export default Tasks

