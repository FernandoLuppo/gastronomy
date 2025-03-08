import { Request, Response } from 'express'

import { STATUS_CODE } from '../../constants'
import { recipesService } from '../../services/recipes'
import { CustomError, handleError } from '../../utils/error'

const RecipesController = {
  homeContentRecommended: async (req: Request, res: Response) => {
    try {
      console.log('TEST01')
      const { list } = await recipesService.getRecommendRecipes()
      console.log('TEST')
      res.status(STATUS_CODE.SUCCESS).send({ success: true, list })
    } catch (error) {
      handleError({ error, res })
    }
  },

  search: async (req: Request, res: Response) => {
    try {
      const { ingredient } = req.body
      const { recipes } = await recipesService.search({ ingredient })

      return res.status(200).send({ success: true, recipes })
    } catch (error) {
      handleError({ error, res })
    }
  },

  list: async (req: Request, res: Response) => {
    try {
      const { recipe, dish } = req.query
      if (!recipe || !dish)
        throw new CustomError({
          message: 'Recipe or dish is missing!',
          statusCode: STATUS_CODE.BAD_REQUEST
        })

      const { recipeList } = await recipesService.list({
        recipe,
        dish
      } as {
        recipe: string
        dish: string
      })

      return res.status(200).send({ success: true, recipeList })
    } catch (error) {
      handleError({ error, res })
    }
  }
}

export { RecipesController }
