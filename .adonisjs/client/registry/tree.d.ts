/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  users: {
    store: typeof routes['users.store']
    login: typeof routes['users.login']
    me: typeof routes['users.me']
    index: typeof routes['users.index']
    show: typeof routes['users.show']
    update: typeof routes['users.update']
    logout: typeof routes['users.logout']
  }
  categories: {
    index: typeof routes['categories.index']
    store: typeof routes['categories.store']
    show: typeof routes['categories.show']
    update: typeof routes['categories.update']
    destroy: typeof routes['categories.destroy']
  }
  tags: {
    index: typeof routes['tags.index']
    store: typeof routes['tags.store']
    show: typeof routes['tags.show']
    update: typeof routes['tags.update']
    destroy: typeof routes['tags.destroy']
  }
  tasks: {
    index: typeof routes['tasks.index']
    store: typeof routes['tasks.store']
    show: typeof routes['tasks.show']
    update: typeof routes['tasks.update']
    destroy: typeof routes['tasks.destroy']
    addTag: typeof routes['tasks.add_tag']
    removeTag: typeof routes['tasks.remove_tag']
  }
  subtask: {
    index: typeof routes['subtask.index']
    store: typeof routes['subtask.store']
    show: typeof routes['subtask.show']
    update: typeof routes['subtask.update']
    destroy: typeof routes['subtask.destroy']
  }
  comments: {
    index: typeof routes['comments.index']
    store: typeof routes['comments.store']
    show: typeof routes['comments.show']
    update: typeof routes['comments.update']
    destroy: typeof routes['comments.destroy']
  }
}
