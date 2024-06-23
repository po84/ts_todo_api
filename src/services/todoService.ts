import { ITodo } from './../types/todo'
import Todo from '../models/todo'

export const createTodo = async (todo: ITodo): Promise<ITodo> => {
  try {
    const newTodo = await Todo.create(todo)
    return newTodo
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const getAllTodos = async (): Promise<ITodo[]> => {
  try {
    const todos = await Todo.find()
    return todos
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const updateTodo = async (todoId: string, updatedTodo: Partial<ITodo>): Promise<ITodo | null> => {
  try {
    const todo = await Todo.findByIdAndUpdate(todoId, updatedTodo, { new: true })
    return todo
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const deleteTodo = async (todoId: string): Promise<void> => {
  try {
    await Todo.findByIdAndDelete(todoId)
  } catch (err) {
    console.log(err)
    throw err
  }
}
