import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class State extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public is_active: boolean

  @column()
  public actionclass: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
