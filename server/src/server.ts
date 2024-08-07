import { app } from './app'

const { PORT } = process.env

//  test

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})
