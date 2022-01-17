import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Wallets extends BaseSchema {
  protected tableName = 'wallets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.bigInteger('gold').defaultTo(0);
      table.bigInteger('runes').defaultTo(0);
      table.bigInteger('essence').defaultTo(0);
      table.bigInteger('copper').defaultTo(0);
      table.bigInteger('wood').defaultTo(0);
      table.bigInteger('food').defaultTo(0);
      table.bigInteger('stone').defaultTo(0);
      table.bigInteger('cobalt_fragment').defaultTo(0);
      table.bigInteger('tome_knowledge').defaultTo(0);
      table.bigInteger('prism_shard').defaultTo(0);
      table.bigInteger('dark_matter').defaultTo(0);
      table.bigInteger('gems').defaultTo(0);
      table.bigInteger('stamina').defaultTo(200);
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
