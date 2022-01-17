import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Wallet extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public gold: bigint
  @column()
  public runes: bigint
  @column()
  public essence: bigint
  @column()
  public copper: bigint
  @column()
  public wood: bigint
  @column()
  public food: bigint
  @column()
  public stone: bigint
  @column()
  public cobalt_fragment: bigint
  @column()
  public tome_knowledge: bigint
  @column()
  public prism_shard: bigint
  @column()
  public dark_matter: bigint
  @column()
  public gems: bigint
  @column()
  public stamina: bigint

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
