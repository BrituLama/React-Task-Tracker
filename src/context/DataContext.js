import { createContext, useState, useEffect } from "react";

const DataContext = createContext()

export const DataProvider = ({children}) => {

  const [showTask, setShowTask] = useState(false)

  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    const getTasks = async()=>{
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }

    getTasks()
  }, [])

  // Get all data
  const fetchTasks = async()=>{
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  //get Single task
  const fetchTask = async(id)=>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  const addForm = async(task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method:'POST',
      headers:{'Content-Type' : 'application/json'},
      body: JSON.stringify(task)
    })

    const data = await res.json()
   
    setTasks([...tasks, data]);
  };

  const onDelete = async(id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = async(id) => {
    const toggleTask = await fetchTask(id)
    const updTask = {...toggleTask, reminder: !toggleTask.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers: {
        'Content-Type':'Application/json'
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };
  
    return (
        <DataContext.Provider value={{ 
          tasks, onDelete, toggleReminder, 
          setTasks
          }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext