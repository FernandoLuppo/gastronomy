import mongoose from 'mongoose'
import User from '../../src/models/User'

jest.setTimeout(30000)

beforeAll(async () => {
  const { MONGO_TEST_URI } = process.env

  if (!MONGO_TEST_URI) {
    throw new Error(
      'MONGO_TEST_URI is not defined in the environment variables.'
    )
  }

  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(MONGO_TEST_URI)
  }
})

beforeEach(async () => {
  await User.deleteMany({})
})

afterAll(async () => {
  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()
})
