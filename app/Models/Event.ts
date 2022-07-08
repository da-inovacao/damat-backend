import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid4 } from 'uuid'
import Presentation from 'App/Models/Presentation'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static seUuid(event: Event) {
    event.id = uuid4()
  }

  @hasMany(() => Presentation)
  public presentations: HasMany<typeof Presentation>

  @column()
  public title: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
