import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {useEffect} from "react";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    newTask: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | GetTasksType
    | SetTodolistsType

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach((t => {
                copyState[t.id] = []
            }))
            return copyState
        }
        case "SET-TASKS": {
            const copyState = {...state, [action.todoListID]: action.tasks}
            return copyState
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.newTask.todoListId];
            const newTasks = [action.newTask, ...tasks];
            stateCopy[action.newTask.todoListId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (newTask: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', newTask}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const getTasks = (tasks: TaskType[], todoListID: string) => {
    return {
        type: "SET-TASKS",
        tasks,
        todoListID
    } as const
}

type GetTasksType = ReturnType<typeof getTasks>

export const fetchTaskTC = (todolistID: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistID)
        .then((res) => {
            dispatch(getTasks(res.data.items, todolistID))
        })
}

export const deleteTaskTC = (todolistID: string, taskID: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistID, taskID)
        .then((res) => {
            dispatch(removeTaskAC(taskID, todolistID))
        })
}

export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistID, title)
        .then((res) => {
            const newTask = res.data.data.item
            dispatch(addTaskAC(newTask))
        })
}

export const updateTaskTC = (todolistID: string, taskID: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const state = getState()
    const allAppTasks = state.tasks
    const tasksForCurrentTodo = allAppTasks[todolistID]
    const changedTask = tasksForCurrentTodo.find((t) => t.id === taskID)

    if (changedTask) {
        const model: UpdateTaskModelType = {
            title: changedTask.title,
            status,
            description: changedTask.description,
            priority: changedTask.priority,
            startDate: changedTask.startDate,
            deadline: changedTask.deadline
        }

        todolistsAPI.updateTask(todolistID, taskID, model)
            .then((res) => {
                dispatch(changeTaskStatusAC(taskID, status, todolistID))
            })
    }
}