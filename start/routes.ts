/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.ts'

const TasksController = () => import('#controllers/tasks_controller')
const UsersController = () => import('#controllers/users_controller')
const CategoriesController = () => import('#controllers/categories_controller')
const TagsController = () => import('#controllers/tags_controller')
const SubtaskController = () => import('#controllers/subtasks_controller')
const CommentsController = () => import('#controllers/comments_controller')

/*
|--------------------------------------------------------------------------
| Rotas públicas de autenticação
|--------------------------------------------------------------------------
*/
router
  .group(() => {
    router.post('/register', [UsersController, 'store'])
    router.post('/login', [UsersController, 'login'])
  })
  .prefix('/auth')

/*
|--------------------------------------------------------------------------
| Rotas protegidas
|--------------------------------------------------------------------------
*/
router
  .group(() => {
    router.get('/me', [UsersController, 'me'])

    router.get('/users', [UsersController, 'index'])
    router.get('/users/:id', [UsersController, 'show'])
    router.put('/users/:id', [UsersController, 'update'])

    router.post('/logout', [UsersController, 'logout'])
  })
  .use(middleware.auth({ guards: ['api'] }))

// --------------------------------------------------------------------------
// Rotas protegidas - Categorias
// --------------------------------------------------------------------------
router
  .group(() => {
    router.get('/categories', [CategoriesController, 'index'])
    router.post('/categories', [CategoriesController, 'store'])
    router.get('/categories/:id', [CategoriesController, 'show'])
    router.put('/categories/:id', [CategoriesController, 'update'])
    router.delete('/categories/:id', [CategoriesController, 'destroy'])
  })
  .use(middleware.auth())

// --------------------------------------------------------------------------
// Rotas protegidas - Tags
// --------------------------------------------------------------------------
router
  .group(() => {
    router.get('/tags', [TagsController, 'index'])
    router.post('/tags', [TagsController, 'store'])
    router.get('/tags/:id', [TagsController, 'show'])
    router.put('/tags/:id', [TagsController, 'update'])
    router.delete('/tags/:id', [TagsController, 'destroy'])
  })
  .use(middleware.auth())

// --------------------------------------------------------------------------
// Rotas protegidas - Tarefas e Subtarefas
// --------------------------------------------------------------------------
router
  .group(() => {
    router.get('/tasks', [TasksController, 'index'])
    router.post('/tasks', [TasksController, 'store'])
    router.get('/tasks/:id', [TasksController, 'show'])
    router.put('/tasks/:id', [TasksController, 'update'])
    router.delete('/tasks/:id', [TasksController, 'destroy'])

    // Subtarefas (agrupadas por tasks autenticadas)
    router.get('/tasks/:taskId/subtasks', [SubtaskController, 'index'])
    router.post('/tasks/:taskId/subtasks', [SubtaskController, 'store'])
    router.get('/tasks/:taskId/subtasks/:id', [SubtaskController, 'show'])
    router.put('/tasks/:taskId/subtasks/:id', [SubtaskController, 'update'])
    router.delete('/tasks/:taskId/subtasks/:id', [SubtaskController, 'destroy'])

    // Tags (Relacionamento Tag <-> Task)
    router.post('/tasks/:id/tags/:tagId', [TasksController, 'addTag'])
    router.delete('/tasks/:id/tags/:tagId', [TasksController, 'removeTag'])
  })
  .use(middleware.auth())

// --------------------------------------------------------------------------
// Rotas protegidas - Comentários
// --------------------------------------------------------------------------
router
  .group(() => {
    router.get('/:taskId/comments', [CommentsController, 'index'])
    router.post('/:taskId/comments', [CommentsController, 'store'])

    router.get('/:taskId/comments/:id', [CommentsController, 'show'])
    router.put('/:taskId/comments/:id', [CommentsController, 'update'])
    router.delete('/:taskId/comments/:id', [CommentsController, 'destroy'])
  })
  .prefix('/tasks')
  .use(middleware.auth({ guards: ['api'] }))
