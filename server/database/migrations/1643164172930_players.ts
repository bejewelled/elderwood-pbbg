import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Players extends BaseSchema {
  protected tableName = 'players'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.boolean('active').defaultTo('false')
      table.date('last_seen')
      table.string('guild')
      table.string('action_class')
      table.string('gather_type').defaultTo('none')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
