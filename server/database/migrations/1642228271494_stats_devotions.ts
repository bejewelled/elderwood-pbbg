import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class StatsDevotions extends BaseSchema {
  protected tableName = 'stats_devotions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('combat_attack');
      table.bigInteger('combat_defense');
      table.bigInteger('combat_dexterity');
      table.bigInteger('combat_agility');
      table.bigInteger('combat_health');
      table.bigInteger('devotion_attack');
      table.bigInteger('devotion_defense');
      table.bigInteger('devotion_dexterity');
      table.bigInteger('devotion_agility');
      table.bigInteger('devotion_health');
      table.bigInteger('devotion_penetration');
      table.bigInteger('devotion_goldmonster');
      table.bigInteger('devotion_resource');
      table.bigInteger('devotion_cobaltchance');
      table.bigInteger('devotion_forgepower');
      table.bigInteger('devotion_jcmultiaction');
      table.bigInteger('devotion_diffmultiaction');
      table.bigInteger('devotion_resettimer');
      table.bigInteger('devotion_guildresource');

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
