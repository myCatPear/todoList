import {v1} from "uuid";
import {FilterValuesType} from "../App";

export type StateType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const removeTodoListAC = (todoListID: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            todoListID
        }
    } as const
}

export const addTodolistAC = (todoListTitle: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            todoListTitle
        }
    } as const
}

export const todoListChangeTitleAC = (newTitle: string, todoListID: string) => {
    return {
        type: "CHANGE_TODOLIST_TITLE",
        payload: {
            newTitle,
            todoListID
        }
    } as const
}

export const changeFilterAC = (todoListID: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {
            todoListID,
            newFilter
        }
    } as const
}
type removeTodoListACType = ReturnType<typeof removeTodoListAC>
type addTodolistACType = ReturnType<typeof addTodolistAC>
type todoListChangeTitleACType = ReturnType<typeof todoListChangeTitleAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>

type todoListReducerType = removeTodoListACType
    | addTodolistACType
    | todoListChangeTitleACType
    | changeFilterACType

export const todoListsReducer = (state: Array<StateType>, action: todoListReducerType) => {
    switch (action.type) {
        case "REMOVE_TODOLIST": {
            return state.filter(s => s.id !== action.payload.todoListID)
        }
        case "ADD_TODOLIST": {
            return [...state, {id: v1(), title: action.payload.todoListTitle, filter: 'all'}]
        }
        case "CHANGE_TODOLIST_TITLE": {
            return state.map(t => t.id === action.payload.todoListID ? {...t, title: action.payload.newTitle} : t)
        }
        case "CHANGE_TODOLIST_FILTER": {
            return state.map(t => t.id === action.payload.todoListID ? {...t, filter:action.payload.newFilter} : t)
        }
        default: {
            throw new Error('invalid ACTION TYPE')
        }
    }
}