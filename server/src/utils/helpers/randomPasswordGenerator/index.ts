export const randomPasswordGenerator = () => {
  const length = 8

  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const symbols = "!@#$%^&*()-_=+[]{}|;:',.<>?"

  const randomUppercase =
    uppercase[Math.floor(Math.random() * uppercase.length)]
  const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)]
  const randomLowercase =
    lowercase[Math.floor(Math.random() * lowercase.length)]
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)]

  const allCharacters = uppercase + lowercase + numbers + symbols
  const remainingLength = length - 4
  let password = randomUppercase + randomSymbol + randomLowercase + randomNumber

  for (let i = 0; i < remainingLength; i++) {
    password += allCharacters[Math.floor(Math.random() * allCharacters.length)]
  }

  password = password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('')

  return password
}
