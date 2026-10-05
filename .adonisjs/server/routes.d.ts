import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'users.store': { paramsTuple?: []; params?: {} }
    'users.login': { paramsTuple?: []; params?: {} }
    'users.me': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.logout': { paramsTuple?: []; params?: {} }
    'categories.index': { paramsTuple?: []; params?: {} }
    'categories.store': { paramsTuple?: []; params?: {} }
    'categories.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.index': { paramsTuple?: []; params?: {} }
    'tags.store': { paramsTuple?: []; params?: {} }
    'tags.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tasks.index': { paramsTuple?: []; params?: {} }
    'tasks.store': { paramsTuple?: []; params?: {} }
    'tasks.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tasks.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tasks.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subtask.index': { paramsTuple: [ParamValue]; params: {'taskId': ParamValue} }
    'subtask.store': { paramsTuple: [ParamValue]; params: {'taskId': ParamValue} }
    'subtask.show': { paramsTuple: [ParamValue,ParamValue]; params: {'taskId': ParamValue,'id': ParamValue} }
    'subtask.update': { paramsTuple: [ParamValue,ParamValue]; params: {'taskId': ParamValue,'id': ParamValue} }
    'subtask.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'taskId': ParamValue,'id': ParamValue} }
    'tasks.add_tag': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'tagId': ParamValue} }
    'tasks.remove_tag': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'tagId': ParamValue} }
    'comments.index': { paramsTuple: [ParamValue]; params: {'taskId': ParamValue} }
    'comments.store': { paramsTuple: [ParamValue]; params: {'taskId': ParamValue} }
    'comments.show': { paramsTuple: [ParamValue,ParamValue]; params: {'taskId': ParamValue,'id': ParamValue} }
    'comments.update': { paramsTuple: [ParamValue,ParamValue]; params: {'taskId': ParamValue,'id': ParamValue} }
    'comments.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'taskId': ParamValue,'id': ParamValue} }
  }
  POST: {
    'users.store': { paramsTuple?: []; params?: {} }
    'users.login': { paramsTuple?: []; params?: {} }
    'users.logout': { paramsTuple?: []; params?: {} }
    'categories.store': { paramsTuple?: []; params?: {} }
    'tags.store': { paramsTuple?: []; params?: {} }
    'tasks.store': { paramsTuple?: []; params?: {} }
    'subtask.store': { paramsTuple: [ParamValue]; params: {'taskId': ParamValue} }
    'tasks.add_tag': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'tagId': ParamValue} }
    'comments.store': { paramsTuple: [ParamValue]; params: {'taskId': ParamValue} }
  }
  GET: {
    'users.me': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.index': { paramsTuple?: []; params?: {} }
    'categories.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.index': { paramsTuple?: []; params?: {} }
    'tags.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tasks.index': { paramsTuple?: []; params?: {} }
    'tasks.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subtask.index': { paramsTuple: [ParamValue]; params: {'taskId': ParamValue} }
    'subtask.show': { paramsTuple: [ParamValue,ParamValue]; params: {'taskId': ParamValue,'id': ParamValue} }
    'comments.index': { paramsTuple: [ParamValue]; params: {'taskId': ParamValue} }
    'comments.show': { paramsTuple: [ParamValue,ParamValue]; params: {'taskId': ParamValue,'id': ParamValue} }
  }
  HEAD: {
    'users.me': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.index': { paramsTuple?: []; params?: {} }
    'categories.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.index': { paramsTuple?: []; params?: {} }
    'tags.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tasks.index': { paramsTuple?: []; params?: {} }
    'tasks.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subtask.index': { paramsTuple: [ParamValue]; params: {'taskId': ParamValue} }
    'subtask.show': { paramsTuple: [ParamValue,ParamValue]; params: {'taskId': ParamValue,'id': ParamValue} }
    'comments.index': { paramsTuple: [ParamValue]; params: {'taskId': ParamValue} }
    'comments.show': { paramsTuple: [ParamValue,ParamValue]; params: {'taskId': ParamValue,'id': ParamValue} }
  }
  PUT: {
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tasks.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subtask.update': { paramsTuple: [ParamValue,ParamValue]; params: {'taskId': ParamValue,'id': ParamValue} }
    'comments.update': { paramsTuple: [ParamValue,ParamValue]; params: {'taskId': ParamValue,'id': ParamValue} }
  }
  DELETE: {
    'categories.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tasks.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subtask.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'taskId': ParamValue,'id': ParamValue} }
    'tasks.remove_tag': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'tagId': ParamValue} }
    'comments.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'taskId': ParamValue,'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}