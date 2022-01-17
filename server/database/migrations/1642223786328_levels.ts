import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Levels extends BaseSchema {
  protected tableName = 'levels'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.bigInteger('level_mastery').defaultTo(1);
      table.bigInteger('level_combat').defaultTo(1);
      table.bigInteger('level_mining').defaultTo(1);
      table.bigInteger('level_woodcutting').defaultTo(1);
      table.bigInteger('level_hunting').defaultTo(1);
      table.bigInteger('level_quarrying').defaultTo(1);
      table.bigInteger('level_conjuring').defaultTo(1);
      table.bigInteger('level_forging').defaultTo(1);
      table.bigInteger('level_jewelcrafting').defaultTo(1);
      table.bigInteger('level-fame').defaultTo(1);
      table.bigInteger('xp-mastery').defaultTo(0);
      table.bigInteger('xp-combat').defaultTo(0);
      table.bigInteger('xp-mining').defaultTo(0);
      table.bigInteger('xp-woodcutting').defaultTo(0);
      table.bigInteger('xp-hunting').defaultTo(0);
      table.bigInteger('xp-quarrying').defaultTo(0);
      table.bigInteger('xp-conjuring').defaultTo(0);
      table.bigInteger('xp-forging').defaultTo(0);
      table.bigInteger('xp-jewelcrafting').defaultTo(0);
      table.bigInteger('xp-fame').defaultTo(0);
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
