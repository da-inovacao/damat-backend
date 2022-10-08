import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Certificate from 'App/Models/Certificate'

export default class CertificatesController {
  public async create({ auth, request }: HttpContextContract) {
    await auth.use('web').authenticate()

    const data = request.only(['title', 'href'])

    return await Certificate.create(data)
  }

  public async index({}: HttpContextContract) {
    return await Certificate.all()
  }

  public async show({ request }: HttpContextContract) {
    const id = request.param('id')

    return await Certificate.findOrFail(id)
  }

  public async update({ auth, request }: HttpContextContract) {
    await auth.use('web').authenticate()
    
    const id = request.param('id')
    const data = request.body()

    const certificate = await Certificate.findOrFail(id)
    return await certificate.merge(data).save()
  }

  public async destroy({ auth, request }: HttpContextContract) {
    await auth.use('web').authenticate()

    const id = request.param('id')

    const certificate = await Certificate.findOrFail(id)

    return await certificate.delete()
  }
}
