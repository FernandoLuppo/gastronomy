import mongoose from 'mongoose'
import User from '../../src/models/User'
import * as dotenv from 'dotenv'
dotenv.config()

beforeAll(async () => {
  // const { MONGO_TEST_URI } = process.env
  // console.log(
  //   'mongoose.connection.readyState: ',
  //   mongoose.connection.readyState
  // )

  // if (!MONGO_TEST_URI) {
  //   throw new Error(
  //     'MONGO_TEST_URI is not defined in the environment variables.'
  //   )
  // }

  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect('mongodb://localhost:27017/gastronomy_test')
  }
})

beforeEach(async () => {
  await User.deleteMany({})
})

afterAll(async () => {
  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()
})
