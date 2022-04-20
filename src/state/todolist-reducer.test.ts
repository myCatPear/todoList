import {v1} from "uuid"
import { FilterValuesType } from "../App";
import {addTodolistAC, changeFilterAC, removeTodoListAC, StateType, todoListChangeTitleAC, todoListsReducer} from "./todolist-reducer";

test('correct todoLists should be removed', () => {
    const toDoListID1 = v1()
    const toDoListID2 = v1()

    const startState: Array<StateType> = [
        {id: toDoListID1, title: "What to learn", filter: 'all'},
        {id: toDoListID2, title: "What t buy", filter: 'all'}
    ]

    //  const endState = todoListsReducer(startState, {type:'REMOVE_TODOLIST', id: toDoListID1})
    const endState = todoListsReducer(startState, removeTodoListAC(toDoListID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(toDoListID2)
})

test('should add new toDoList', () => {
    const toDoListID1 = v1()
    const toDoListID2 = v1()
    let newTodolistTitle = "New Todolist";

    const startState: Array<StateType> = [
        {id: toDoListID1, title: "What to learn", filter: "all"},
        {id: toDoListID2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, addTodolistAC(newTodolistTitle))
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);


})

test('should change title', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<StateType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, todoListChangeTitleAC(newTodolistTitle, todolistId2))

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
})

test('should change filter', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<StateType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, changeFilterAC(todolistId2, newFilter))
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);

})