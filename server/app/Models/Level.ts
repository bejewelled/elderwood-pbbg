import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Level extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public level_mastery: bigint
  @column()
  public level_combat: bigint
  @column()
  public level_mining: bigint
  @column()
  public level_woodcutting: bigint
  @column()
  public level_hunting: bigint
  @column()
  public level_quarrying: bigint
  @column()
  public level_forging: bigint
  @column()
  public level_jewelcrafting: bigint
  @column()
  public level_fame: bigint
  @column()
  public xp_mastery: bigint
  @column()
  public xp_combat: bigint
  @column()
  public xp_mining: bigint
  @column()
  public xp_woodcutting: bigint
  @column()
  public xp_hunting: bigint
  @column()
  public xp_quarrying: bigint
  @column()
  public xp_forging: bigint
  @column()
  public xp_jewelcrafting: bigint
  @column()
  public xp_fame: bigint


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
