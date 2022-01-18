import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class XpThreshold extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public combat: number
  @column()
  public mining: number
  @column()
  public woodcutting: number
  @column()
  public hunting: number
  @column()
  public quarrying: number
  @column()
  public forging: number
  @column()
  public jewelcrafting: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
