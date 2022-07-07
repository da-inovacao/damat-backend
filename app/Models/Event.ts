import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid4 } from 'uuid'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static seUuid(event: Event) {
    event.id = uuid4()
  }

  @column()
  public title: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
