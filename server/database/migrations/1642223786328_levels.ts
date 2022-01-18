import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Levels extends BaseSchema {
  protected tableName = 'levels'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.integer('level_mastery').defaultTo(1);
      table.integer('level_combat').defaultTo(1);
      table.integer('level_mining').defaultTo(1);
      table.integer('level_woodcutting').defaultTo(1);
      table.integer('level_hunting').defaultTo(1);
      table.integer('level_quarrying').defaultTo(1);
      table.integer('level_conjuring').defaultTo(1);
      table.integer('level_forging').defaultTo(1);
      table.integer('level_jewelcrafting').defaultTo(1);
      table.integer('level_fame').defaultTo(1);
      table.integer('xp_mastery').defaultTo(0);
      table.integer('xp_combat').defaultTo(0);
      table.integer('xp_mining').defaultTo(0);
      table.integer('xp_woodcutting').defaultTo(0);
      table.integer('xp_hunting').defaultTo(0);
      table.integer('xp_quarrying').defaultTo(0);
      table.integer('xp_conjuring').defaultTo(0);
      table.integer('xp_forging').defaultTo(0);
      table.integer('xp_jewelcrafting').defaultTo(0);
      table.integer('xp_fame').defaultTo(0);
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
