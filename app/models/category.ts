import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.ts'
import Task from './task.ts'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare color: string

  @column()
  declare icon: string

  @column()
  declare userId: number

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>

  // Relacionamento: Uma categoria possui muitas tarefas (diretamente ou via categoria)
  @hasMany(() => Task, { foreignKey: 'categoryId' })
  declare tasks: HasMany<typeof Task>

  @column.dateTime({ autoCreate: true, serializeAs: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updated_at' })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
}
