import mongoose from 'mongoose'
// import User from '../../src/model/User'

beforeAll(async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect('mongodb://localhost/PokemonTest')
  }
})

beforeEach(async () => {
  // await User.deleteMany({})
})

afterAll(async () => {
  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()
})
