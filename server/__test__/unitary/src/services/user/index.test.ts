import { userService } from '../../../../../src/services/user/index'
import {
  encrypt,
  decrypt
} from '../../../../../src/services/user/encryptPassword'
import User from '../../../../../src/models/User'
import * as dotenv from 'dotenv'

dotenv.config()

jest.mock('../../../../../src/services/user/encryptPassword')
jest.mock('../../../../../src/models/user/User')

describe('userService', () => {
  let data: any

  beforeEach(() => {
    data = {
      _id: '64c3f9c8e6f3c7c9c0cabc12',
      name: 'Test',
      email: 'test@gmail.com',
      password: '12345678Ab@'
    }
  })

  describe('register', () => {
    it('Should register a new user', async () => {
      const mockEncrypt = encrypt as jest.Mock
      mockEncrypt.mockReturnValue({
        encryptedUserPassword: data.password
      })
      const mockCreateUser = User.create as jest.Mock
      mockCreateUser.mockResolvedValue({
        email: data.email,
        password: data.password
      })
      const newUser = await userService.register({ data })

      expect(newUser).toBeDefined()
      expect(newUser).toHaveProperty('success', true)
      expect(newUser.data).toHaveProperty('email', data.email)
      expect(newUser.data).toHaveProperty('password', data.password)
      expect(newUser.error).not.toBeDefined()
    })

    it('Should return a error when try to register a user', async () => {
      const newUser = await userService.register({
        data: { name: '', email: '', password: '' }
      })

      expect(newUser).toBeDefined()
      expect(newUser).toHaveProperty('error', 'Data is missing')
      expect(newUser).toHaveProperty('success', false)
    })
  })

  describe('login', () => {
    it('Should make a login with success', async () => {
      const mockEncrypt = encrypt as jest.Mock
      mockEncrypt.mockReturnValue({
        encryptedUserPassword: data.password
      })

      const mockCreateUser = User.create as jest.Mock
      mockCreateUser.mockReturnValue({
        email: data.email,
        password: data.password
      })

      const mockDecrypt = decrypt as jest.Mock
      mockDecrypt.mockReturnValue({ success: true })

      const mockUserLogin = User.findOne as jest.Mock
      mockUserLogin.mockReturnValue({
        select: jest.fn().mockResolvedValue({
          _id: data._id,
          name: data.name,
          email: data.email,
          password: data.password
        })
      })

      const result = await userService.login({
        email: data.email,
        password: data.password,
        socialLogin: false
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', true)
      expect(result.userTokens?.tokens).toHaveProperty('accessToken')
      expect(result.userTokens?.tokens).toHaveProperty('refreshToken')
    })

    it('Should return a error when try to login with wrong credentials', async () => {
      const mockUserLogin = User.findOne as jest.Mock
      mockUserLogin.mockReturnValue({
        select: jest.fn().mockResolvedValue(null)
      })

      const result = await userService.login({
        email: '',
        password: '',
        socialLogin: false
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', false)
      expect(result).toHaveProperty('error', 'User not found!')
    })

    it('Should return a error when email or password is incorrect', async () => {
      const mockUserLogin = User.findOne as jest.Mock
      mockUserLogin.mockReturnValue({
        select: jest.fn().mockResolvedValue({
          data
        })
      })

      const mockDecrypt = decrypt as jest.Mock
      mockDecrypt.mockReturnValue({ success: false })

      const result = await userService.login({
        email: data.email,
        password: data.password,
        socialLogin: false
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', false)
      expect(result).toHaveProperty('error', 'Email or password incorrect!')
    })
  })

  describe('userPersonalInfos', () => {
    it('Should return user infos', async () => {
      const mockEncrypt = encrypt as jest.Mock
      mockEncrypt.mockReturnValue({
        encryptedUserPassword: data.password
      })

      const mockUser = User.create as jest.Mock
      mockUser.mockResolvedValue({
        name: data.email,
        email: data.name,
        password: data.password
      })

      const mockGetUserInfos = User.findOne as jest.Mock
      mockGetUserInfos.mockReturnValue({
        select: jest.fn().mockResolvedValue({
          _id: data._id,
          email: data.email,
          name: data.name
        })
      })

      const result = await userService.userPersonalInfos({ _id: data._id })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', true)
      expect(result).toHaveProperty('user', {
        _id: data._id,
        email: data.email,
        name: data.name
      })
    })

    it('Should return an error when try to get user infos', async () => {
      const mockGetUserInfos = User.findOne as jest.Mock
      mockGetUserInfos.mockReturnValue({
        select: jest.fn().mockResolvedValue(null)
      })
      const result = await userService.userPersonalInfos({ _id: '' })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('error', 'User not found!')
      expect(result).toHaveProperty('success', false)
    })
  })

  describe('updatePersonalInfos', () => {
    it('Should update user infos', async () => {
      const mockEncrypt = encrypt as jest.Mock
      mockEncrypt.mockReturnValue({
        encryptedUserPassword: data.password
      })

      const mockFindOneAndUpdate = User.findOneAndUpdate as jest.Mock
      mockFindOneAndUpdate.mockReturnValue({
        select: jest.fn().mockResolvedValue({ data })
      })

      const result = await userService.updatePersonalInfos({
        _id: data._id,
        data
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', true)
      expect(result.user).toHaveProperty('data', {
        _id: data._id,
        name: data.name,
        email: data.email,
        password: data.password
      })
    })

    it('Should return an error when try to update user infos', async () => {
      const mockEncrypt = encrypt as jest.Mock
      mockEncrypt.mockReturnValue({
        encryptedUserPassword: data.password
      })

      const mockFindOneAndUpdate = User.findOneAndUpdate as jest.Mock
      mockFindOneAndUpdate.mockReturnValue({
        select: jest.fn().mockResolvedValue(null)
      })

      const result = await userService.updatePersonalInfos({
        _id: data._id,
        data
      })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('error', 'User not found!')
      expect(result).toHaveProperty('success', false)
    })
  })

  describe('deleteAccount', () => {
    it('Should delete an account correctly', async () => {
      const mockDeleteOne = User.deleteOne as jest.Mock
      mockDeleteOne.mockResolvedValue({ success: true })

      const result = await userService.deleteAccount({ _id: data._id })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', true)
    })

    it('Should return an error when try to delete an account', async () => {
      const mockDeleteOne = User.deleteOne as jest.Mock
      mockDeleteOne.mockReturnValue({ deletedCount: 0 })

      const result = await userService.deleteAccount({ _id: data._id })

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', false)
      expect(result).toHaveProperty('error', 'User not found')
    })
  })
})
