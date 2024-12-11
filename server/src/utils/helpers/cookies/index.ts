interface ICookiesCalc {
  cookieMaxAge: string | undefined
  dataType: 'days' | 'minutes'
}

export const cookiesCalc = ({ cookieMaxAge, dataType }: ICookiesCalc) => {
  if (!cookieMaxAge) return

  if (dataType === 'days') return Number(cookieMaxAge) * 86400000
  if (dataType === 'minutes') return Number(cookieMaxAge) * 60000
}
