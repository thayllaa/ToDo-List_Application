/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'users.store': {
    methods: ["POST"],
    pattern: '/auth/register',
    tokens: [{"old":"/auth/register","type":0,"val":"auth","end":""},{"old":"/auth/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['users.store']['types'],
  },
  'users.login': {
    methods: ["POST"],
    pattern: '/auth/login',
    tokens: [{"old":"/auth/login","type":0,"val":"auth","end":""},{"old":"/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['users.login']['types'],
  },
  'users.me': {
    methods: ["GET","HEAD"],
    pattern: '/me',
    tokens: [{"old":"/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['users.me']['types'],
  },
  'users.index': {
    methods: ["GET","HEAD"],
    pattern: '/users',
    tokens: [{"old":"/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.index']['types'],
  },
  'users.show': {
    methods: ["GET","HEAD"],
    pattern: '/users/:id',
    tokens: [{"old":"/users/:id","type":0,"val":"users","end":""},{"old":"/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.show']['types'],
  },
  'users.update': {
    methods: ["PUT"],
    pattern: '/users/:id',
    tokens: [{"old":"/users/:id","type":0,"val":"users","end":""},{"old":"/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.update']['types'],
  },
  'users.logout': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['users.logout']['types'],
  },
  'categories.index': {
    methods: ["GET","HEAD"],
    pattern: '/categories',
    tokens: [{"old":"/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['categories.index']['types'],
  },
  'categories.store': {
    methods: ["POST"],
    pattern: '/categories',
    tokens: [{"old":"/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['categories.store']['types'],
  },
  'categories.show': {
    methods: ["GET","HEAD"],
    pattern: '/categories/:id',
    tokens: [{"old":"/categories/:id","type":0,"val":"categories","end":""},{"old":"/categories/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['categories.show']['types'],
  },
  'categories.update': {
    methods: ["PUT"],
    pattern: '/categories/:id',
    tokens: [{"old":"/categories/:id","type":0,"val":"categories","end":""},{"old":"/categories/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['categories.update']['types'],
  },
  'categories.destroy': {
    methods: ["DELETE"],
    pattern: '/categories/:id',
    tokens: [{"old":"/categories/:id","type":0,"val":"categories","end":""},{"old":"/categories/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['categories.destroy']['types'],
  },
  'tags.index': {
    methods: ["GET","HEAD"],
    pattern: '/tags',
    tokens: [{"old":"/tags","type":0,"val":"tags","end":""}],
    types: placeholder as Registry['tags.index']['types'],
  },
  'tags.store': {
    methods: ["POST"],
    pattern: '/tags',
    tokens: [{"old":"/tags","type":0,"val":"tags","end":""}],
    types: placeholder as Registry['tags.store']['types'],
  },
  'tags.show': {
    methods: ["GET","HEAD"],
    pattern: '/tags/:id',
    tokens: [{"old":"/tags/:id","type":0,"val":"tags","end":""},{"old":"/tags/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tags.show']['types'],
  },
  'tags.update': {
    methods: ["PUT"],
    pattern: '/tags/:id',
    tokens: [{"old":"/tags/:id","type":0,"val":"tags","end":""},{"old":"/tags/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tags.update']['types'],
  },
  'tags.destroy': {
    methods: ["DELETE"],
    pattern: '/tags/:id',
    tokens: [{"old":"/tags/:id","type":0,"val":"tags","end":""},{"old":"/tags/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tags.destroy']['types'],
  },
  'tasks.index': {
    methods: ["GET","HEAD"],
    pattern: '/tasks',
    tokens: [{"old":"/tasks","type":0,"val":"tasks","end":""}],
    types: placeholder as Registry['tasks.index']['types'],
  },
  'tasks.store': {
    methods: ["POST"],
    pattern: '/tasks',
    tokens: [{"old":"/tasks","type":0,"val":"tasks","end":""}],
    types: placeholder as Registry['tasks.store']['types'],
  },
  'tasks.show': {
    methods: ["GET","HEAD"],
    pattern: '/tasks/:id',
    tokens: [{"old":"/tasks/:id","type":0,"val":"tasks","end":""},{"old":"/tasks/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tasks.show']['types'],
  },
  'tasks.update': {
    methods: ["PUT"],
    pattern: '/tasks/:id',
    tokens: [{"old":"/tasks/:id","type":0,"val":"tasks","end":""},{"old":"/tasks/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tasks.update']['types'],
  },
  'tasks.destroy': {
    methods: ["DELETE"],
    pattern: '/tasks/:id',
    tokens: [{"old":"/tasks/:id","type":0,"val":"tasks","end":""},{"old":"/tasks/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tasks.destroy']['types'],
  },
  'subtask.index': {
    methods: ["GET","HEAD"],
    pattern: '/tasks/:taskId/subtasks',
    tokens: [{"old":"/tasks/:taskId/subtasks","type":0,"val":"tasks","end":""},{"old":"/tasks/:taskId/subtasks","type":1,"val":"taskId","end":""},{"old":"/tasks/:taskId/subtasks","type":0,"val":"subtasks","end":""}],
    types: placeholder as Registry['subtask.index']['types'],
  },
  'subtask.store': {
    methods: ["POST"],
    pattern: '/tasks/:taskId/subtasks',
    tokens: [{"old":"/tasks/:taskId/subtasks","type":0,"val":"tasks","end":""},{"old":"/tasks/:taskId/subtasks","type":1,"val":"taskId","end":""},{"old":"/tasks/:taskId/subtasks","type":0,"val":"subtasks","end":""}],
    types: placeholder as Registry['subtask.store']['types'],
  },
  'subtask.show': {
    methods: ["GET","HEAD"],
    pattern: '/tasks/:taskId/subtasks/:id',
    tokens: [{"old":"/tasks/:taskId/subtasks/:id","type":0,"val":"tasks","end":""},{"old":"/tasks/:taskId/subtasks/:id","type":1,"val":"taskId","end":""},{"old":"/tasks/:taskId/subtasks/:id","type":0,"val":"subtasks","end":""},{"old":"/tasks/:taskId/subtasks/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['subtask.show']['types'],
  },
  'subtask.update': {
    methods: ["PUT"],
    pattern: '/tasks/:taskId/subtasks/:id',
    tokens: [{"old":"/tasks/:taskId/subtasks/:id","type":0,"val":"tasks","end":""},{"old":"/tasks/:taskId/subtasks/:id","type":1,"val":"taskId","end":""},{"old":"/tasks/:taskId/subtasks/:id","type":0,"val":"subtasks","end":""},{"old":"/tasks/:taskId/subtasks/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['subtask.update']['types'],
  },
  'subtask.destroy': {
    methods: ["DELETE"],
    pattern: '/tasks/:taskId/subtasks/:id',
    tokens: [{"old":"/tasks/:taskId/subtasks/:id","type":0,"val":"tasks","end":""},{"old":"/tasks/:taskId/subtasks/:id","type":1,"val":"taskId","end":""},{"old":"/tasks/:taskId/subtasks/:id","type":0,"val":"subtasks","end":""},{"old":"/tasks/:taskId/subtasks/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['subtask.destroy']['types'],
  },
  'tasks.add_tag': {
    methods: ["POST"],
    pattern: '/tasks/:id/tags/:tagId',
    tokens: [{"old":"/tasks/:id/tags/:tagId","type":0,"val":"tasks","end":""},{"old":"/tasks/:id/tags/:tagId","type":1,"val":"id","end":""},{"old":"/tasks/:id/tags/:tagId","type":0,"val":"tags","end":""},{"old":"/tasks/:id/tags/:tagId","type":1,"val":"tagId","end":""}],
    types: placeholder as Registry['tasks.add_tag']['types'],
  },
  'tasks.remove_tag': {
    methods: ["DELETE"],
    pattern: '/tasks/:id/tags/:tagId',
    tokens: [{"old":"/tasks/:id/tags/:tagId","type":0,"val":"tasks","end":""},{"old":"/tasks/:id/tags/:tagId","type":1,"val":"id","end":""},{"old":"/tasks/:id/tags/:tagId","type":0,"val":"tags","end":""},{"old":"/tasks/:id/tags/:tagId","type":1,"val":"tagId","end":""}],
    types: placeholder as Registry['tasks.remove_tag']['types'],
  },
  'comments.index': {
    methods: ["GET","HEAD"],
    pattern: '/tasks/:taskId/comments',
    tokens: [{"old":"/tasks/:taskId/comments","type":0,"val":"tasks","end":""},{"old":"/tasks/:taskId/comments","type":1,"val":"taskId","end":""},{"old":"/tasks/:taskId/comments","type":0,"val":"comments","end":""}],
    types: placeholder as Registry['comments.index']['types'],
  },
  'comments.store': {
    methods: ["POST"],
    pattern: '/tasks/:taskId/comments',
    tokens: [{"old":"/tasks/:taskId/comments","type":0,"val":"tasks","end":""},{"old":"/tasks/:taskId/comments","type":1,"val":"taskId","end":""},{"old":"/tasks/:taskId/comments","type":0,"val":"comments","end":""}],
    types: placeholder as Registry['comments.store']['types'],
  },
  'comments.show': {
    methods: ["GET","HEAD"],
    pattern: '/tasks/:taskId/comments/:id',
    tokens: [{"old":"/tasks/:taskId/comments/:id","type":0,"val":"tasks","end":""},{"old":"/tasks/:taskId/comments/:id","type":1,"val":"taskId","end":""},{"old":"/tasks/:taskId/comments/:id","type":0,"val":"comments","end":""},{"old":"/tasks/:taskId/comments/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['comments.show']['types'],
  },
  'comments.update': {
    methods: ["PUT"],
    pattern: '/tasks/:taskId/comments/:id',
    tokens: [{"old":"/tasks/:taskId/comments/:id","type":0,"val":"tasks","end":""},{"old":"/tasks/:taskId/comments/:id","type":1,"val":"taskId","end":""},{"old":"/tasks/:taskId/comments/:id","type":0,"val":"comments","end":""},{"old":"/tasks/:taskId/comments/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['comments.update']['types'],
  },
  'comments.destroy': {
    methods: ["DELETE"],
    pattern: '/tasks/:taskId/comments/:id',
    tokens: [{"old":"/tasks/:taskId/comments/:id","type":0,"val":"tasks","end":""},{"old":"/tasks/:taskId/comments/:id","type":1,"val":"taskId","end":""},{"old":"/tasks/:taskId/comments/:id","type":0,"val":"comments","end":""},{"old":"/tasks/:taskId/comments/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['comments.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
