import { Router } from 'express'
import { RecipesController } from '../../../src/controllers/RecipesController'
import { routesAuthentication } from '../../../src/middlewares/authentications/routesAuth'

const recipesRouter = Router()

recipesRouter.get(
  '/home-content/recommended',
  RecipesController.homeContentRecommended
)

recipesRouter.post(
  '/search',
  routesAuthentication.searchIngredient,
  RecipesController.search
)

recipesRouter.get('/recipe-list', RecipesController.list)

export { recipesRouter }
