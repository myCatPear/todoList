import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskObjectType = {
    [key:string] : Array<TaskType>
}

function App() {

    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskObjectType>({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeToDoList = (toDoListID:string) => {
        setTodolists(todolists.filter(t => t.id !== toDoListID))
        delete tasks[toDoListID]
    }

/*    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);*/
    //let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(toDoListID:string,id: string) {
 /*       let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);*/
        setTasks({...tasks, [toDoListID] : tasks[toDoListID].filter(t => t.id !== id)})
    }

    function addTask(toDoListID:string,title: string) {
  /*      let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);*/
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [toDoListID]: [newTask,...tasks[toDoListID]]})
    }

    function changeStatus(toDoListID:string,taskId: string, isDone: boolean) {
    /*    let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks([...tasks]);*/
        setTasks({...tasks, [toDoListID]: tasks[toDoListID].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

/*    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }*/

    function changeFilter(toDoListID:string, value: FilterValuesType) {
        //setFilter(value);
       setTodolists(todolists.map(t => t.id === toDoListID ? {...t, filter:  value} : t))

    }


    return (
        <div className="App">
            {todolists.map(t => {

                let tasksForTodolist = tasks[t.id];

                 if (t.filter === "active") {
                      tasksForTodolist = tasks[t.id].filter(t => t.isDone === false);
                  }
                  if (t.filter === "completed") {
                      tasksForTodolist = tasks[t.id].filter(t => t.isDone === true);
                  }
                return <Todolist
                    key={t.id}
                    toDoListID={t.id}
                    title={t.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={t.filter}
                    removeToDoList={removeToDoList}
                />
            })}

        </div>
    );
}

export default App;
