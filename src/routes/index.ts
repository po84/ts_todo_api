import { Router } from 'express'
import { getTodos, addTodo, updateTodo, deleteTodo } from '../controllers/todos'

const router: Router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/todos', getTodos)
router.post('/add-todo', addTodo)
router.put('/edit-todo/:id', updateTodo)
router.delete('/delete-todo/:id', deleteTodo)

/* eslint-disable @typescript-eslint/no-misused-promises */

export default router
