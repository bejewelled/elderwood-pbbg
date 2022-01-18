import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Xpthresholds extends BaseSchema {
  protected tableName = 'xp_thresholds'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('combat').defaultTo(100);
      table.integer('mining').defaultTo(100);
      table.integer('woodcutting').defaultTo(100);
      table.integer('hunting').defaultTo(100);
      table.integer('quarrying').defaultTo(100);
      table.integer('forging').defaultTo(100);
      table.integer('jewelcrafting').defaultTo(100);
      table.integer('fame').defaultTo(1000);
      table.integer('mastery').defaultTo(100);
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
