import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table.text('description').nullable()
      table
        .enum('status', ['pending', 'in_progress', 'completed', 'cancelled'])
        .defaultTo('pending')
      table.enum('priority', ['low', 'medium', 'high', 'urgent']).defaultTo('low')

      table.timestamp('due_date').nullable()
      table.timestamp('completed_at').nullable()

      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('category_id').unsigned().references('id').inTable('categories').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
