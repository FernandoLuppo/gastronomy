import { MOCK_RECIPES } from '../../constants'
import Recipes from '../../models/Recipes'
import axios from 'axios'

export const recipesService = {
  getRecommendRecipes: async () => {
    const recipesList = await recommendedRecipes()

    if (recipesList.length < 4) {
      const mockRecommendedRecipes = await getMockRecommendedRecipes({
        recipesLength: recipesList.length
      })

      const currentList = [...recipesList, ...mockRecommendedRecipes]
      return { list: currentList, success: true }
    }

    return { list: recipesList, success: true }
  },

  search: async ({ ingredient }: { ingredient: string }) => {
    const { EDMAM_FULL_URL } = process.env
    const url = `${EDMAM_FULL_URL}&q=${ingredient}`
    console.log({ url })

    const response = await axios.get(url)

    return { success: true, recipes: response.data }
  }
}

const recommendedRecipes = async () => {
  const [recipes] = await Recipes.aggregate([
    {
      $project: {
        _id: 1,
        viewCount: 1,
        label: 1,
        image: 1,
        mealType: 1,
        cuisineType: 1
      }
    },
    {
      $sort: { viewCount: -1 }
    },
    {
      $limit: 10
    }
  ])

  return recipes || []
}

const getMockRecommendedRecipes = async ({
  recipesLength
}: {
  recipesLength: 0 | 1 | 2 | 3 | 4
}) => {
  if (recipesLength < 0 || recipesLength > 5) return []

  const currentList = MOCK_RECIPES[recipesLength]

  const processedList = await Promise.all(
    currentList.map(async item => {
      try {
        const response = await axios.get(item)
        const currentData = buildMockData(response.data)

        return currentData
      } catch (error) {
        console.log(item, error)
        return null
      }
    })
  )
  return processedList
}

const buildMockData = (data: any) => {
  const oldData = data.recipe

  const newData = {
    _id: getIdFromRecipes(oldData.uri),
    label: oldData.label,
    image: oldData.image,
    mealType: oldData.mealType,
    cuisineType: oldData.cuisineType
  }
  return newData
}

const getIdFromRecipes = (input: string) => {
  const parts = input.split('_')
  return parts[parts.length - 1]
}
