import { Schema, model } from 'mongoose'

const User = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    match: /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    unique: true
  },
  password: {
    type: String,
    required: false,
    minLength: 8,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
  }
  // refreshToken: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'refresh_tokens',
  //   required: true
  // }
})

export default model('users', User)
