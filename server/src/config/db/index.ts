import mongoose from 'mongoose'

const initDb = () => {
  const { AMBIENT, MONGO_DEV_URI, MONGO_TEST_URI } = process.env

  let mongoURI

  switch (AMBIENT) {
    case 'test':
      mongoURI = MONGO_TEST_URI
      break
    case 'development':
    default:
      mongoURI = MONGO_DEV_URI
      break
  }

  if (mongoURI) {
    mongoose
      .connect(mongoURI)
      .then(() => {
        console.log(`MongoDB connected successfully to ${AMBIENT} database`)
      })
      .catch(error => {
        console.error('MongoDB connection error:', error)
      })
  }
}

export { initDb }
