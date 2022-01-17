import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class StatDevotion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public combat_attack: bigint
  @column()
  public combat_defense: bigint
  @column()
  public combat_dexterity: bigint
  @column()
  public combat_agility: bigint
  @column()
  public combat_health: bigint
  @column()
  public devotion_attack: bigint
  @column()
  public devotion_defense: bigint
  @column()
  public devotion_dexterity: bigint
  @column()
  public devotion_agility: bigint
  @column()
  public devotion_health: bigint
  @column()
  public devotion_penetration: bigint
  @column()
  public devotion_goldmonster: bigint
  @column()
  public devotion_resource: bigint
  @column()
  public devotion_cobaltchance: bigint
  @column()
  public devotion_forgepower: bigint
  @column()
  public devotion_jcmultiaction: bigint
  @column()
  public devotion_diffmultiaction: bigint
  @column()
  public devotion_resettimer: bigint
  @column()
  public devotion_guildresource: bigint

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
