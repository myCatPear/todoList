import {setAppErrorAC, setAppStatusAC} from "../features/TodolistsList/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handlerNetworkError = (dispatch:Dispatch, message:string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

export const handleAppError = <T>(dispatch:Dispatch, data:ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occured'))
    }
    dispatch(setAppStatusAC('failed'))
}
