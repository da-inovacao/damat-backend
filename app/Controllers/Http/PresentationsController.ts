import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'
import Presentation from 'App/Models/Presentation'

export default class PresentationsController {
  public async create({ auth, request }: HttpContextContract) {
    await auth.use('web').authenticate()

    const { eventId } = request.only(['eventId'])
    const data = request.only(['title'])
    const event = await Event.findOrFail(eventId)

    return await (await event.related('presentations').create(data)).save()
  }

  public async index({}: HttpContextContract) {
    return await Presentation.all()
  }

  public async show({ request }: HttpContextContract) {
    const id = request.param('id')

    return await Presentation.findOrFail(id)
  }

  public async update({ auth, request }: HttpContextContract) {
    await auth.use('web').authenticate()

    const id = request.param('id')
    const data = request.body()

    const presentation = await Presentation.findOrFail(id)
    return await presentation.merge(data).save()
  }

  public async destroy({ auth, request }: HttpContextContract) {
    await auth.use('web').authenticate()

    const id = request.param('id')

    const presentation = await Presentation.findOrFail(id)

    return await presentation.delete()
  }
}
