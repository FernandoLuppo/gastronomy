import { EncryptPassword, TokenService } from '../../services'

export interface IEncryptPassword {
  encryptPassword: EncryptPassword
}

export interface ILogin {
  tokenService: TokenService
  encryptPassword: EncryptPassword
}
