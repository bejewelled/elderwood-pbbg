import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class States extends BaseSchema {
  protected tableName = 'states'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.boolean('is_active');
      table.string('actionclass');

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
