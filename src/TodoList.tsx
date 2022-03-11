import React from 'react';
import {FilterValuesType, TaskType} from "./App";
import ToDoListHeader from "./ToDoListHeader";
import Button from "./Button";
import TaskList from "./TaskList";

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (id: number) => void,
    changeFilter: (value: FilterValuesType) => void,
}

const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <ToDoListHeader title={props.title}/>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            <TaskList tasks={props.tasks} removeTask={props.removeTask}/>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>

            </div>
        </div>
    );
};

export default TodoList;