import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'auth_access_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('tokenable_id').notNullable().unsigned().references('id').inTable('users')
      table.string('type').notNullable()
      table.string('name').nullable()
      table.string('hash').notNullable().unique()
      table.text('abilities').notNullable()
      table.timestamp('last_used_at').nullable()
      table.timestamp('expires_at').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
