import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import userEvent from "@testing-library/user-event";

export type FilterValuesType = "all" | "completed" | "active";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

function App() {
    const todoListTitle_1: string = 'What to learn';


    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS/ES6", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "XXX", isDone: false}
    ]);

    let [filter, setFilter] = useState<FilterValuesType>('all');

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(item => item.id !== id);
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }



    let tasksForTodoList = tasks;

    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(item => item.isDone === true)
    }
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(item => item.isDone === false)
    }

    return (
        <div className="App">
            <TodoList title={todoListTitle_1}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

