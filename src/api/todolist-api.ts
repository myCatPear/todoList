import axios from "axios";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        "API-KEY": "ecdc6e54-19e0-470a-834c-9d33301a545a"
    }
})

export const todoListAPI = {
    getTodoLists: () => {
        return instance.get<TodoType[]>("/todo-lists")
    },
    createTodoList: (title:string) => {
        return instance.post<CreateTodoType>("/todo-lists", {title})
    },
    deleteTodoList: (id:string) => {
        return instance.delete<DeleteTodoType>('/todo-lists/' + id)
    },
    changeTitleTodoList: (id:string, title:string) => {
        return instance.put('/todo-lists/' + '9c1b8426-cf99-4785-879b-cc55270ff853', {title})
    }
}

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CreateTodoType = {
    resultCode: number
    messages: string[],
    fieldsErrors:[]
    data: {
        item: TodoType
    }
}

type DeleteTodoType = {
    resultCode: number
    messages: string[],
    fieldsErrors:[]
    data: {}
}


