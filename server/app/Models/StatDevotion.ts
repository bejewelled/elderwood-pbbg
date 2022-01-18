import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class StatDevotion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public combat_attack: number
  @column()
  public combat_defense: number
  @column()
  public combat_dexterity: number
  @column()
  public combat_agility: number
  @column()
  public combat_health: number
  @column()
  public devotion_attack: number
  @column()
  public devotion_defense: number
  @column()
  public devotion_dexterity: number
  @column()
  public devotion_agility: number
  @column()
  public devotion_health: number
  @column()
  public devotion_penetration: number
  @column()
  public devotion_goldmonster: number
  @column()
  public devotion_resource: number
  @column()
  public devotion_cobaltchance: number
  @column()
  public devotion_forgepower: number
  @column()
  public devotion_jcmultiaction: number
  @column()
  public devotion_diffmultiaction: number
  @column()
  public devotion_resettimer: number
  @column()
  public devotion_guildresource: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
