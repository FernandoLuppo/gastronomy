import { RecipesController } from '../../controllers/RecipesController'
import { Router } from 'express'

const router = Router()

router.get('/home-content', RecipesController.homeContent)

export { router }
