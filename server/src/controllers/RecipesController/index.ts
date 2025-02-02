import { STATUS_CODE } from '../../constants'
import { recipesService } from '../../services/recipes'
import { Request, Response } from 'express'

const RecipesController = {
  homeContent: async (req: Request, res: Response) => {
    try {
      const { success, list } = await recipesService.getRecommendRecipes()
      if (!success)
        throw new Error('Error trying to build recommended recipes list')

      res.status(STATUS_CODE.SUCCESS).send({ success, list })
    } catch (error) {
      console.log(error)
      return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send({ success: false, error })
    }
  },

  search: async (req: Request, res: Response) => {
    try {
      const { ingredient } = req.body
      const { success, recipes } = await recipesService.search({ ingredient })
      console.log({ recipes })
      if (!success) throw new Error('Error trying search an ingredient')

      return res.status(200).send({ success, recipes })
    } catch (error) {
      console.log(error)
      return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send({ success: false, error })
    }
  }
}

export { RecipesController }
