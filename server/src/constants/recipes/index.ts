const { EDAMAM_API_URL, EDAMAM_APPLICATION_ID, EDAMAM_APPLICATION_KEYS } =
  process.env
const urlEnd = `?app_id=${EDAMAM_APPLICATION_ID}&app_key=${EDAMAM_APPLICATION_KEYS}`
const recipeOne = `${EDAMAM_API_URL}/5d7bc3df3a794b61a15ae64ac7afa858${urlEnd}`
const recipeTwo = `${EDAMAM_API_URL}/c9bf37296a0126d18781c952dc45a230${urlEnd}`
const recipeThree = `${EDAMAM_API_URL}/98bffffbf45d274a5d5948c489f62aff${urlEnd}`
const recipeFour = `${EDAMAM_API_URL}/b20815eac65ee2fa5f848f56c16056dd${urlEnd}`
const recipeFive = `${EDAMAM_API_URL}/8d3e4b9299664a1ca8e6f5bdb8532300${urlEnd}`

export const MOCK_RECIPES = [
  recipeOne,
  recipeTwo,
  recipeThree,
  recipeFour,
  recipeFive
]
