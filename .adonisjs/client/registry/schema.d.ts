/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'users.store': {
    methods: ["POST"]
    pattern: '/auth/register'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['store']>>>
    }
  }
  'users.login': {
    methods: ["POST"]
    pattern: '/auth/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['login']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['login']>>>
    }
  }
  'users.me': {
    methods: ["GET","HEAD"]
    pattern: '/me'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['me']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['me']>>>
    }
  }
  'users.index': {
    methods: ["GET","HEAD"]
    pattern: '/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['index']>>>
    }
  }
  'users.show': {
    methods: ["GET","HEAD"]
    pattern: '/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['show']>>>
    }
  }
  'users.update': {
    methods: ["PUT"]
    pattern: '/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['update']>>>
    }
  }
  'users.logout': {
    methods: ["POST"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['logout']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['logout']>>>
    }
  }
  'categories.index': {
    methods: ["GET","HEAD"]
    pattern: '/categories'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/categories_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/categories_controller').default['index']>>>
    }
  }
  'categories.store': {
    methods: ["POST"]
    pattern: '/categories'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/categories_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/categories_controller').default['store']>>>
    }
  }
  'categories.show': {
    methods: ["GET","HEAD"]
    pattern: '/categories/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/categories_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/categories_controller').default['show']>>>
    }
  }
  'categories.update': {
    methods: ["PUT"]
    pattern: '/categories/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/categories_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/categories_controller').default['update']>>>
    }
  }
  'categories.destroy': {
    methods: ["DELETE"]
    pattern: '/categories/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/categories_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/categories_controller').default['destroy']>>>
    }
  }
  'tags.index': {
    methods: ["GET","HEAD"]
    pattern: '/tags'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tags_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tags_controller').default['index']>>>
    }
  }
  'tags.store': {
    methods: ["POST"]
    pattern: '/tags'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tags_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tags_controller').default['store']>>>
    }
  }
  'tags.show': {
    methods: ["GET","HEAD"]
    pattern: '/tags/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tags_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tags_controller').default['show']>>>
    }
  }
  'tags.update': {
    methods: ["PUT"]
    pattern: '/tags/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tags_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tags_controller').default['update']>>>
    }
  }
  'tags.destroy': {
    methods: ["DELETE"]
    pattern: '/tags/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tags_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tags_controller').default['destroy']>>>
    }
  }
  'tasks.index': {
    methods: ["GET","HEAD"]
    pattern: '/tasks'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['index']>>>
    }
  }
  'tasks.store': {
    methods: ["POST"]
    pattern: '/tasks'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['store']>>>
    }
  }
  'tasks.show': {
    methods: ["GET","HEAD"]
    pattern: '/tasks/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['show']>>>
    }
  }
  'tasks.update': {
    methods: ["PUT"]
    pattern: '/tasks/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['update']>>>
    }
  }
  'tasks.destroy': {
    methods: ["DELETE"]
    pattern: '/tasks/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['destroy']>>>
    }
  }
  'subtask.index': {
    methods: ["GET","HEAD"]
    pattern: '/tasks/:taskId/subtasks'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { taskId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subtasks_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/subtasks_controller').default['index']>>>
    }
  }
  'subtask.store': {
    methods: ["POST"]
    pattern: '/tasks/:taskId/subtasks'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { taskId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subtasks_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/subtasks_controller').default['store']>>>
    }
  }
  'subtask.show': {
    methods: ["GET","HEAD"]
    pattern: '/tasks/:taskId/subtasks/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { taskId: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subtasks_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/subtasks_controller').default['show']>>>
    }
  }
  'subtask.update': {
    methods: ["PUT"]
    pattern: '/tasks/:taskId/subtasks/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { taskId: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subtasks_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/subtasks_controller').default['update']>>>
    }
  }
  'subtask.destroy': {
    methods: ["DELETE"]
    pattern: '/tasks/:taskId/subtasks/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { taskId: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subtasks_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/subtasks_controller').default['destroy']>>>
    }
  }
  'tasks.add_tag': {
    methods: ["POST"]
    pattern: '/tasks/:id/tags/:tagId'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; tagId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['addTag']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['addTag']>>>
    }
  }
  'tasks.remove_tag': {
    methods: ["DELETE"]
    pattern: '/tasks/:id/tags/:tagId'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; tagId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['removeTag']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['removeTag']>>>
    }
  }
  'comments.index': {
    methods: ["GET","HEAD"]
    pattern: '/tasks/:taskId/comments'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { taskId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['index']>>>
    }
  }
  'comments.store': {
    methods: ["POST"]
    pattern: '/tasks/:taskId/comments'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { taskId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['store']>>>
    }
  }
  'comments.show': {
    methods: ["GET","HEAD"]
    pattern: '/tasks/:taskId/comments/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { taskId: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['show']>>>
    }
  }
  'comments.update': {
    methods: ["PUT"]
    pattern: '/tasks/:taskId/comments/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { taskId: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['update']>>>
    }
  }
  'comments.destroy': {
    methods: ["DELETE"]
    pattern: '/tasks/:taskId/comments/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { taskId: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['destroy']>>>
    }
  }
}
