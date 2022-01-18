import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Wallet extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public gold: number
  @column()
  public runes: number
  @column()
  public essence: number
  @column()
  public copper: number
  @column()
  public wood: number
  @column()
  public food: number
  @column()
  public stone: number
  @column()
  public cobalt_fragment: number
  @column()
  public tome_knowledge: number
  @column()
  public prism_shard: number
  @column()
  public dark_matter: number
  @column()
  public gems: number
  @column()
  public stamina: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
