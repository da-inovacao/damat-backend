import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'
import Presentation from 'App/Models/Presentation'

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

    const event = await Event.findOrFail(id)

    await event.load('presentations', () => {})

    return event
  }

  public async update({ auth, request }: HttpContextContract) {
    await auth.use('web').authenticate()

    const id = request.param('id')
    const data = request.body()
    const presentations = request.input('presentations')

    for(let pres of presentations){
      const _pres = await Presentation.findOrFail(pres.id)
      _pres.title = pres.title
      // _pres.date = pres.date
      _pres.save()
    }

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
