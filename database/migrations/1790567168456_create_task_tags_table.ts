import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'task_tags'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('task_id').unsigned().references('id').inTable('tasks')
      // faz sentido colocar onCascade? Excluindo task, os tags também serão excluídos

      table.integer('tag_id').unsigned().references('id').inTable('tags')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.primary(['task_id', 'tag_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
