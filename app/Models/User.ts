import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Hash from '@ioc:Adonis/Core/Hash'
import Logger from '@ioc:Adonis/Core/Logger'

export default class User extends BaseModel {
  @column()
  public id: string

  @beforeCreate()
  public static async assignUuid(user: User) {
    user.id = uuid()
    const hashedPassword = await Hash.make(user.password)
    Logger.info(hashedPassword)
    user.password = hashedPassword
  }

  @column({ isPrimary: true })
  public login: string

  @column()
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
