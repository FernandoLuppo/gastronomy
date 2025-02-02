import { Router } from 'express'
import { RecipesController } from '../../../src/controllers/RecipesController'
import { routesAuthentication } from '../../../src/middlewares/authentications/routesAuth'

const recipesRouter = Router()

recipesRouter.post(
  '/search',
  routesAuthentication.searchIngredient,
  RecipesController.search
)

export { recipesRouter }
