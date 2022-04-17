import {ActionType, div, multi, salaryReducer, StateType, sub, sum} from "./tasks";

test("sum", () => {
    //1.Тестовые данные:
    const salary: number = 800
    const n:number = 200

    //2.Выполнение тестируемого кода
   const result =  sum(salary, n)

    //3. Проверка результата
    expect(result).toBe(1000)
})

test("sub", () => {
expect(sub(1000,200)).toBe(800)
})

test("div", () => {
    expect(div(1000,10)).toBe(100)
})

test("multi", () => {
    expect(multi(10,20)).toBe(200)
})

test("case SUM of salaryReducer", () => {
    const salary:StateType = 800

    const action:ActionType = {
        type:'SUM',
        n:200
    }
    const testAction:ActionType = {
        type: 'TEST',
        n:200
    }
    const result = salaryReducer(salary, action)
    expect(result).toBe(1000)
    expect(salaryReducer(salary,testAction)).toBe(salary)
})

test('case SUB of salaryReducer', () => {
    const salary:StateType = 1000

    const action:ActionType = {
        type:"SUB",
        n:100
    }
    expect(salaryReducer(salary, action)).toBe(900)
})

test('case DIV of salaryReducer', () => {
    const salary = 1000

    const action:ActionType = {
        type:"DIV",
        n:10
    }
    expect(salaryReducer(salary, action)).toBe(100)
})

test('case MULTI of salaryReducer', () => {
    const state:StateType = 1000

    const action:ActionType = {
        type:"MULTI",
        n:20
    }
    expect(salaryReducer(state, action)).toBe(20000)
})
