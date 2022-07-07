import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'

export default class EventsController {
  public async create({ auth, request }: HttpContextContract) {
    await auth.use('web').authenticate()

    const data = request.only(['title'])

    return await Event.create(data)
  }

  public async index({}: HttpContextContract) {
    return await Event.all()
  }

  public async show({ request }: HttpContextContract) {
    const id = request.param('id')

    return await Event.findOrFail(id)
  }

  public async update({ auth, request }: HttpContextContract) {
    await auth.use('web').authenticate()

    const id = request.param('id')
    const data = request.body()

    const event = await Event.findOrFail(id)
    return await event.merge(data).save()
  }

  public async destroy({ auth, request }: HttpContextContract) {
    await auth.use('web').authenticate()

    const id = request.param('id')

    const event = await Event.findOrFail(id)

    return await event.delete()
  }
}
