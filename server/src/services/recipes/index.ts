import { CustomError } from '../../utils/error'
import { MOCK_RECIPES, STATUS_CODE } from '../../constants'
import axios from 'axios'

interface IRecipe {
  recipe: {
    uri: string
    label: string
    image: string
    mealType: string
    cuisineType: string
  }
}

export const recipesService = {
  getRecommendRecipes: async () => {
    const mockRecommendedRecipes = await _getMockRecommendedRecipes()
    if (mockRecommendedRecipes.length < 4) {
      throw new CustomError({
        message: 'Insufficient recipes',
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR
      })
    }
    return { list: mockRecommendedRecipes }
  },

  search: async ({ ingredient }: { ingredient: string }) => {
    const { EDMAM_FULL_URL } = process.env
    const url = `${EDMAM_FULL_URL}&q=${ingredient}`

    const response = await axios.get(url)
    if (!response?.data)
      throw new CustomError({
        message: 'Error trying to get the recipes.',
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR
      })

    return { recipes: response.data }
  },

  list: async ({ recipe, dish }: { recipe: string; dish: string }) => {
    const { EDMAM_FULL_URL } = process.env
    const response = await axios.get(`${EDMAM_FULL_URL}&${recipe}Type=${dish}`)
    if (!response?.data)
      throw new CustomError({
        message: 'Error trying to get the recipes list.',
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR
      })

    const recipeList = response.data.hits.map((item: IRecipe) =>
      _dataTemplate(item)
    )
    return { recipeList }
  }
}

const _getMockRecommendedRecipes = async () => {
  const processedList = await Promise.all(
    MOCK_RECIPES.map(async item => {
      const response = await axios.get(item)
      return _dataTemplate(response.data)
    })
  )
  return processedList
}

const _dataTemplate = (data: IRecipe) => {
  const recipe = data.recipe

  const newData = {
    _id: _getIdFromRecipes(recipe.uri),
    label: recipe.label,
    image: recipe.image,
    mealType: recipe.mealType,
    cuisineType: recipe.cuisineType
  }
  return newData
}

const _getIdFromRecipes = (input: string) => {
  const parts = input.split('_')
  return parts[parts.length - 1]
}
