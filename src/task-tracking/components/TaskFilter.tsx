import React from 'react'
import categories  from '../categories'


interface Props{
onSelectCategory: (category: string) => void

}
const TaskFilter = ({onSelectCategory}: Props) => {
  return (
    <select className="form-select" onChange={(event) => onSelectCategory(event.target.value)}>
    <option value="">all categories</option>
   {categories.map(category => <option key={category} value={category}>{category}</option>)}
    </select>
  )
}

export default TaskFilter