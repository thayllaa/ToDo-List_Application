import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.ts'
import Task from './task.ts'

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare color: string | null

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  // Relacionamento N:N com Task via tabela pivot 'task_tags'
  @manyToMany(() => Task, {
    pivotTable: 'task_tags',
    pivotForeignKey: 'tag_id',
    pivotRelatedForeignKey: 'task_id',
    pivotTimestamps: true,
  })
  declare tasks: ManyToMany<typeof Task>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
