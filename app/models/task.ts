import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'

import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

import Category from './category.ts'
import User from './user.ts'
import Subtask from './subtask.ts'
import Comment from './comment.ts'
import Tag from './tag.ts'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare categoryId: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare status: 'pending' | 'in_progress' | 'completed' | 'cancelled'

  @column()
  declare priority: 'low' | 'medium' | 'high' | 'urgent'

  @column.dateTime()
  declare dueDate: DateTime | null

  @column.dateTime()
  declare completedAt: DateTime | null

  @column.dateTime({
    autoCreate: true,
    serializeAs: 'created_at',
  })
  declare createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: 'updated_at',
  })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  // Task pertence a uma Category
  @belongsTo(() => Category, {
    foreignKey: 'categoryId',
  })
  declare category: BelongsTo<typeof Category>

  // Task pertence a um User
  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  // Task possui várias Subtasks
  @hasMany(() => Subtask, {
    foreignKey: 'taskId',
  })
  declare subtasks: HasMany<typeof Subtask>

  // Task possui vários Comments
  @hasMany(() => Comment, {
    foreignKey: 'taskId',
  })
  declare comments: HasMany<typeof Comment>

  // Task possui várias Tags
  @manyToMany(() => Tag, {
    localKey: 'id',
    pivotTable: 'task_tags',
    pivotForeignKey: 'task_id',
    pivotRelatedForeignKey: 'tag_id',
    pivotTimestamps: true,
  })
  declare tags: ManyToMany<typeof Tag>
}
