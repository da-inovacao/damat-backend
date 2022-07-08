import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid4 } from 'uuid'
import Event from 'App/Models/Event'

export default class Presentation extends BaseModel {
  @beforeCreate()
  public static setUuid(presentation: Presentation) {
    presentation.id = uuid4()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public eventId: string

  @column()
  public title: string

  @belongsTo(() => Event)
  public event: BelongsTo<typeof Event>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
