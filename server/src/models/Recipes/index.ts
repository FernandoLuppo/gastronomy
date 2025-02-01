import { Schema, model } from 'mongoose'

export const Recipes = new Schema(
  {
    viewCount: {
      type: Number,
      required: true
    },
    label: {
      type: Number,
      required: true
    },
    image: {
      type: Number,
      required: true
    },
    dietLabels: {
      type: Number,
      required: true
    },
    mealType: {
      type: Number,
      required: true
    },
    cuisineType: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default model('recipes', Recipes)
