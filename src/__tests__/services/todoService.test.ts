import * as todoService from '../../services/todoService'
import { ITodo } from './../../types/todo'
import Todo from '../../models/todo'

jest.mock('../../models/todo', () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
  }
}))

const todoId = 'mockedTOdoId'
const mockTodo: Partial<ITodo> = {
  name: 'mocked todo',
  description: 'sefkjlsafhjel',
  status: false
}

describe('Todo Service Tests', () => {
  it('should create a new todo', async () => {
    (Todo.create as jest.Mock).mockResolvedValueOnce({
      ...mockTodo,
      _id: todoId
    })

    const todoData: Partial<ITodo> = { ...mockTodo }

    const createdTodo: ITodo = await todoService.createTodo(
      todoData as ITodo
    )

    expect(createdTodo._id).not.toBeNull()
    expect(createdTodo.name).toBe(todoData.name)
    expect(createdTodo.description).toBe(todoData.description)
    expect(createdTodo.status).toBe(todoData.status)

    expect(Todo.create).toHaveBeenCalledWith(todoData)
  })

  it('should update todo by ID', async () => {
    (Todo.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce({ ...mockTodo, _id: todoId })

    const updatedTodoData: Partial<ITodo> = {
      name: 'mocked todo'
    }
    const updatedTodo = await todoService.updateTodo(
      todoId,
      updatedTodoData
    )

    expect(updatedTodo?._id).toBe(todoId)
    expect(updatedTodo?.name).toBe(updatedTodoData.name)
    expect(updatedTodo?.description).toBe(mockTodo.description)
    expect(updatedTodo?.status).toBe(mockTodo.status)

    expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith(
      todoId,
      updatedTodoData,
      { new: true }
    )
  })

  it('should delete todo by ID', async () => {
    (Todo.findByIdAndDelete as jest.Mock).mockResolvedValueOnce({ ...mockTodo, _id: todoId })
    await todoService.deleteTodo(todoId)

    expect(Todo.findByIdAndDelete).toHaveBeenCalledWith(todoId)
  })

  it('should get all todos', async () => {
    const mockTodos: Array<Partial<ITodo>> = [
      mockTodo,
      {
        _id: 'mockedTodoId2',
        name: 'some more name',
        description: 'some 1234 description',
        status: true
      }
    ];
    (Todo.find as jest.Mock).mockResolvedValueOnce(mockTodos)

    const todos = await todoService.getAllTodos()

    expect(todos).toEqual(mockTodos)
    expect(Todo.find).toHaveBeenCalled()
  })
})
