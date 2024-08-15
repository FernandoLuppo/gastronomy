import { Schema, model } from 'mongoose'

export const Token = new Schema({
  refreshToken: {
    type: String,
    required: true
  },
  expireDat: {
    type: Date,
    required: true
  },
  userToken: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

export default model('token', Token)
