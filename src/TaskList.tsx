import React from 'react';
import {TaskType} from "./App";


type TaskListPropsType = {
    tasks: Array<TaskType>
    removeTask: (id:number) => void
}

const TaskList = (props: TaskListPropsType) => {

    const tasksJSXElements = props.tasks.map(item => <li key={item.id}>
        <input type="checkbox" checked={item.isDone}/>
        <span>{item.title}</span>
        <button onClick={() => props.removeTask(item.id)}>x</button>
    </li>)

    return (
        <div>
            <ul>
                {tasksJSXElements}
            </ul>
        </div>
    );
};

export default TaskList;