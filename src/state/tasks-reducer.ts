import {FilterValuesType, TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTasksActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todoListID: string
}

type ActionsType = RemoveTasksActionType | AddTaskActionType | changeTaskStatusActionType | changeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskID)}
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todoListID]: [{id:v1(),title:action.title, isDone:false},...state[action.todoListID]]
            }
        }
        case "CHANGE-TASK": {
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => {
                    return t.id === action.taskID ? {...t, isDone:action.isDone} : t
                })
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => {
                    return t.id === action.taskID ? {...t, title:action.newTitle} : t
                })
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todoListID]:[]
            }
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskID: string, todoListID: string): RemoveTasksActionType => {
    return {
        type: 'REMOVE-TASK',
        taskID,
        todoListID
    }
}

export const addTaskAC = (title:string, todoListID:string) => {
    return {
        type:'ADD-TASK',
        title,
        todoListID
    } as const
}

type AddTaskActionType = ReturnType<typeof addTaskAC>

export const changeTaskStatusAC = (taskID:string, isDone:boolean, todoListID:string) => {
    return {
        type:'CHANGE-TASK',
        taskID,
        isDone,
        todoListID
    } as const
}

type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskTitleAC = (todoListID:string, taskID:string, newTitle:string) => {
    return {
        type:"CHANGE-TASK-TITLE",
        todoListID,
        taskID,
        newTitle
    } as const
}

type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>