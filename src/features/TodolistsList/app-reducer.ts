export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

export type AppActionsType = setAppStatusACType | setAppErrorAC

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}

type setAppStatusACType = ReturnType<typeof setAppStatusAC>

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)


type setAppErrorAC = ReturnType<typeof setAppErrorAC>

