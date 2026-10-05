import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('content').notNullable()
      table.integer('task_id').unsigned().notNullable().references('id').inTable('tasks')
      // faz sentido colocar onCascade? Excluindo task, os comentarios são excluídos também

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()

      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
