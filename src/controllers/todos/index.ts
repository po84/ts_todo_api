import { Response, Request } from 'express'
import { ITodo } from './../../types/todo'
import Todo from '../../models/todo'
import * as TodoService from '../../services/todoService'

const handleError = (res: Response, error: any): void => {
  if (error instanceof Error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(500).json({ error: 'Unexpected error' })
  }
}

const getTodos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await TodoService.getAllTodos()
    res.status(200).json({ todos })
  } catch (err) {
    handleError(res, err)
  }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, 'name' | 'description' | 'status'>
    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status
    })

    const newTodo = await TodoService.createTodo(todo)
    const allTodos: ITodo[] = await Todo.find()

    res.status(201).json({
      message: 'Todo added',
      todo: newTodo,
      todos: allTodos
    })
  } catch (err) {
    handleError(res, err)
  }
}

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body
    } = req

    const updateTodo: ITodo | null = await TodoService.updateTodo(id, body)
    const allTodos: ITodo[] = await Todo.find()

    if (updateTodo !== null) {
      res.status(200).json({
        message: 'Todo updated',
        todo: updateTodo,
        todos: allTodos
      })
    } else {
      res.status(404).json({ error: 'Todo not found' })
    }
  } catch (err) {
    handleError(res, err)
  }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    await TodoService.deleteTodo(req.params.id)
    const allTodos: ITodo[] = await Todo.find()

    res.status(200).json({
      message: 'Todo deleted',
      todos: allTodos
    })
  } catch (err) {
    handleError(res, err)
  }
}

export { getTodos, addTodo, updateTodo, deleteTodo }
