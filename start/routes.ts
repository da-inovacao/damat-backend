/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

Route.post('/notices', 'NoticesController.create')
Route.get('/notices', 'NoticesController.index')
Route.get('/notices/:id', 'NoticesController.show')
Route.put('/notices/:id', 'NoticesController.update')
Route.delete('/notices/:id', 'NoticesController.destroy')

Route.post('/certificates', 'CertificatesController.create')
Route.get('/certificates', 'CertificatesController.index')
Route.get('/certificates/:id', 'CertificatesController.show')
Route.put('/certificates/:id', 'CertificatesController.update')
Route.delete('/certificates/:id', 'CertificatesController.destroy')

Route.post('/events', 'EventsController.create')
Route.get('/events', 'EventsController.index')
Route.get('/events/:id', 'EventsController.show')
Route.put('/events/:id', 'EventsController.update')
Route.delete('/events/:id', 'EventsController.destroy')

Route.post('/presentations', 'PresentationsController.create')
Route.get('/presentations', 'PresentationsController.index')
Route.get('/presentations/:id', 'PresentationsController.show')
Route.put('/presentations/:id', 'PresentationsController.update')
Route.delete('/presentations/:id', 'PresentationsController.destroy')

// Route.get('users', async () => {
//   return await User.all()
// })

// Route.post('users', async ({ request }) => {
//   const data = request.only(['login', 'password'])

//   return await User.create(data)
// })

// Route.get('login', async ({ auth }) => {
//   return auth.use('basic').authenticate()
// })

Route.post('/login', async ({ auth, request, response }) => {
  const login = request.input('login')
  const password = request.input('password')

  try {
    const user = await User.query().where('login', login).firstOrFail()

    if (await Hash.verify(user.password, password)) {
      await auth.use('web').login(user)
      response.status(200)
    } else {
      response.status(401).json({ message: 'INVALID PASSWORD' })
    }
  } catch (error) {
    response.status(401).json({ message: 'INVALID LOGIN' })
  }
})

// Route.get('dashboard', async ({ auth }) => {
//   await auth.use('web').authenticate()

//   return { view: 'dashboard' }
// })
