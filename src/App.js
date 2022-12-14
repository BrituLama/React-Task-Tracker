import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./components/About";
import AddForm from "./components/AddForm";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import {DataProvider} from './context/DataContext'

function App() {
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

    
  };

  return (
    <>
      <DataProvider>
        <Router>
          <div className="container">
            <Header toggleShowTask = {() => setShowTask(!showTask)}/>
            {showTask && <AddForm add={addForm} />}
            {tasks.length > 0 ? (
              <Tasks />
            ) : (
              "Nothing to display"
            )}

              
              <Route path='/about' component={About} />
            <Footer />
          </div>
        </Router>
      </DataProvider>
    </>
  );
}

export default App;
