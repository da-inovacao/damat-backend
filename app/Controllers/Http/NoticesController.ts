import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Notice from 'App/Models/Notice'

export default class NoticesController {
  public async create({ auth, request }: HttpContextContract) {
    await auth.use('web').authenticate()

    const data = request.only(['title', 'text', 'endAt', 'href'])

    return await Notice.create(data)
  }

  public async index({}: HttpContextContract) {
    return await Notice.all()
  }

  public async show({ request }: HttpContextContract) {
    const id = request.param('id')

    return await Notice.findOrFail(id)
  }

  public async update({ auth, request }: HttpContextContract) {
    await auth.use('web').authenticate()
    
    const id = request.param('id')
    const data = request.body()

    const notice = await Notice.findOrFail(id)
    return await notice.merge(data).save()
  }

  public async destroy({ auth, request }: HttpContextContract) {
    await auth.use('web').authenticate()

    const id = request.param('id')

    const notice = await Notice.findOrFail(id)

    return await notice.delete()
  }
}
