import { Schema, model } from 'mongoose'

export const Favorites = new Schema({
  recipeId: {
    type: [Number],
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

export default model('favorites', Favorites)
