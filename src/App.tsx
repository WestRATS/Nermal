import{useState} from 'react'
import Alert from "./components/Alert";
import Button from "./components/Button";
import Form from './Form';
import TaskForm from './task-tracking/components/TaskForm';
import TaskList from './task-tracking/components/TaskList';
import TaskFilter from './task-tracking/components/TaskFilter';
import categories from './task-tracking/categories';
import status from './task-tracking/status';



function App() {
const [selectedCategory, setSelectedCategory]= useState("")

  const [tasks,setTasks] =  useState([
    {id: 1, taskName: "math", status : "in progress", category : "school/work"},
    {id: 6, taskName: "food bank", status : "tbd", category : "volunteer hours"},
    {id: 4, taskName: "s.a.t", status : "in progress", category : "extra curriculars"}
  ]
  )

  const visibleTasks = selectedCategory ? tasks.filter(t => t.category === selectedCategory) : tasks
  
return (
<div>
  <div className="mb-5">
    <TaskForm onSubmit={task => setTasks([...tasks, {...task, id:tasks.length + 1}])} />
   
  </div>

<TaskFilter onSelectCategory={category => setSelectedCategory(category)} />

<TaskList tasks={visibleTasks} onDelete={(id) => setTasks(tasks.filter(t => t.id != id))}></TaskList> 



</div>
  )  
}
export default App;