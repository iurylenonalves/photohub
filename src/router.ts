import { Router } from 'express'
import { ContactsController } from './server/controllers/ContactsController'

const router = Router()

const contactsController = new ContactsController()

router.post("/contacts", contactsController.sentEmail)

export { router }