export const securityCodeGenerator = () => {
  let securityCode = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let x = 0

  while (x < 5) {
    const currentCharacter = Math.floor(Math.random() * characters.length)
    securityCode += characters.charAt(currentCharacter)
    x++
  }

  return securityCode
}
