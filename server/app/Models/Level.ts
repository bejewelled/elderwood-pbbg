import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Level extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public level_mastery: number
  @column()
  public level_combat: number
  @column()
  public level_mining: number
  @column()
  public level_woodcutting: number
  @column()
  public level_hunting: number
  @column()
  public level_quarrying: number
  @column()
  public level_forging: number
  @column()
  public level_jewelcrafting: number
  @column()
  public level_fame: number
  @column()
  public xp_mastery: number
  @column()
  public xp_combat: number
  @column()
  public xp_mining: number
  @column()
  public xp_woodcutting: number
  @column()
  public xp_hunting: number
  @column()
  public xp_quarrying: number
  @column()
  public xp_forging: number
  @column()
  public xp_jewelcrafting: number
  @column()
  public xp_fame: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
