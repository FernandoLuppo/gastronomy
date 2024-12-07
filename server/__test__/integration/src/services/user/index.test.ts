import { userService } from '../../../../../src/services/user'
import User from '../../../../../src/models/User'
import { verify } from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

describe('userService', () => {
  let data: any

  beforeEach(() => {
    data = {
      name: 'Test',
      email: 'test@gmail.com',
      password: '12345678Ab@'
    }
  })

  describe('register', () => {
    it('Should register a new user', async () => {
      const user = await userService.register({ data })

      expect(user).not.toBeNull()
      expect(user?.data?.email).toEqual(data.email)
      expect(user?.data?.password).not.toBeNull()
      expect(user?.data?.password?.length).toBeGreaterThan(10)
      expect(user?.data?.password).not.toEqual(data.password)
    })

    it('Should return an error when trying to register a user', async () => {
      const dataError = {
        name: '',
        password: '',
        email: ''
      }
      const user = await userService.register({ data: dataError })

      expect(user).toBeDefined()
      expect(user).toHaveProperty('success', false)
      expect(user).toHaveProperty('error', 'Data is missing')
    })

    it('Should return an error when trying to register a user with wrong email', async () => {
      const dataError = {
        name: data.name,
        password: data.password,
        email: 'emailTest'
      }
      try {
        await userService.register({ data: dataError })
      } catch (error) {
        expect(error).toBeDefined()
        expect(error).toHaveProperty('_message', 'users validation failed')
      }
    })

    it('Should return an error when trying to register a user with wrong name', async () => {
      const dataError = {
        name: '123 test',
        password: data.password,
        email: data.email
      }
      try {
        await userService.register({ data: dataError })
      } catch (error) {
        expect(error).toBeDefined()
        expect(error).toHaveProperty('_message', 'users validation failed')
      }
    })

    it('Should return an error when trying to register a user with a password thats not satisfy the function', async () => {
      const dataError = {
        name: data.name,
        password: '123',
        email: data.email
      }
      try {
        await userService.register({ data: dataError })
      } catch (error) {
        expect(error).toBeDefined()
        expect(error).toHaveProperty('_message', 'users validation failed')
      }
    })

    it('Should return an error when trying to register an already registered user', async () => {
      await userService.register({ data })

      try {
        await userService.register({ data })
      } catch (error) {
        expect(error).toBeDefined()
        expect(error).toHaveProperty('code', 11000)
        expect(error).toHaveProperty('message')
        expect((error as { message: string }).message).toContain(
          'duplicate key error'
        )
      }
    })
  })

  describe('login', () => {
    it('Should make a login', async () => {
      await userService.register({ data })
      const userLogin = await userService.login({
        email: data.email,
        password: data.password,
        socialLogin: false
      })

      expect(userLogin.success).toBeTruthy()
      expect(userLogin.error).toBeUndefined()
      expect(userLogin.userTokens?.tokens?.accessToken).not.toBeNull()
      expect(userLogin.userTokens?.tokens?.refreshToken).not.toBeNull()
    })

    it('Login tokens must be valid', async () => {
      await userService.register({ data })
      const userLogin = await userService.login({
        email: data.email,
        password: data.password,
        socialLogin: false
      })
      const accessToken = userLogin.userTokens?.tokens?.accessToken as string
      const refreshToken = userLogin.userTokens?.tokens?.refreshToken as string

      const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

      const accessTokenWithoutBearer = accessToken.replace('Bearer ', '')
      const refreshTokenWithoutBearer = refreshToken.replace('Bearer ', '')

      const accessTokenDecoded = verify(
        accessTokenWithoutBearer,
        ACCESS_TOKEN_SECRET as string
      )
      const refreshTokenDecoded = verify(
        refreshTokenWithoutBearer,
        REFRESH_TOKEN_SECRET as string
      )

      expect(accessTokenDecoded).toBeDefined()
      expect(accessTokenDecoded).toHaveProperty('content')
      expect(accessTokenDecoded).toHaveProperty('role', 'accessToken')

      expect(refreshTokenDecoded).toBeDefined()
      expect(refreshTokenDecoded).toHaveProperty('content')
      expect(refreshTokenDecoded).toHaveProperty('role', 'refreshToken')
    })

    it('User can not log in', async () => {
      const item = await userService.login({
        email: data.email,
        password: data.password,
        socialLogin: false
      })

      expect(item).toBeDefined()
      expect(item).toHaveProperty('error', 'User not found!')
      expect(item).toHaveProperty('success', false)
    })
  })

  describe('updatePersonalInfos', () => {
    it('Should update user infos', async () => {
      await userService.register({ data })
      await userService.login({
        email: data.email,
        password: data.password,
        socialLogin: false
      })
      const user = await User.findOne({ email: data.email })
      const newData = {
        email: 'test02@gmail.com',
        name: 'Test 02'
      }
      const userId = user?._id.toString() as string
      const userUpdateInfos = await userService.updatePersonalInfos({
        _id: userId,
        data: newData
      })
      expect(userUpdateInfos).toBeDefined()
      expect(userUpdateInfos.success).toBeTruthy()
      expect(userUpdateInfos.user?.name).not.toEqual(data.name)
      expect(userUpdateInfos.user?.email).not.toEqual(data.email)
      expect(userUpdateInfos.user).toHaveProperty('name', 'Test 02')
      expect(userUpdateInfos.user).toHaveProperty('email', 'test02@gmail.com')
    })

    it('Should not update user infos', async () => {
      await userService.register({ data })
      await userService.login({
        email: data.email,
        password: data.password,
        socialLogin: false
      })
      const user = await User.findOne({ email: data.email })
      const newData = {
        email: undefined,
        name: undefined
      }
      const userId = user?._id.toString() as string
      const userUpdateInfos = await userService.updatePersonalInfos({
        _id: userId,
        data: newData
      })

      expect(userUpdateInfos).toBeDefined()
      expect(userUpdateInfos).toHaveProperty('success', true)
      expect(userUpdateInfos.user?.name).toEqual(data.name)
      expect(userUpdateInfos.user?.email).toEqual(data.email)
    })

    it('Should return an error when try to update user infos', async () => {
      const newData = {
        email: undefined,
        name: undefined
      }
      try {
        await userService.updatePersonalInfos({
          _id: '123',
          data: newData
        })
      } catch (error) {
        expect(error).toBeDefined()
        expect(error).toHaveProperty('reason')
      }
    })
  })

  describe('userPersonalInfos', () => {
    it('Should return user personal infos', async () => {
      await userService.register({ data })
      await userService.login({
        email: data.email,
        password: data.password,
        socialLogin: false
      })
      const user = await User.findOne({ email: data.email })

      const userId = user?._id.toString() as string
      const userInfos = await userService.userPersonalInfos({
        _id: userId
      })

      expect(userInfos).toBeDefined()
      expect(userInfos).toHaveProperty('success', true)
      expect(userInfos).toHaveProperty('user')
      expect(userInfos.user).toHaveProperty('name', data.name)
      expect(userInfos.user).toHaveProperty('email', data.email)
    })

    it('Should not return user personal info', async () => {
      const userInfos = await userService.userPersonalInfos({
        _id: '64f147c6f2336f8adf9b1234'
      })

      expect(userInfos).toBeDefined()
      expect(userInfos).toHaveProperty('error', 'User not found!')
      expect(userInfos).toHaveProperty('success', false)
    })
  })

  describe('deleteAccount', () => {
    it('Should delete an account', async () => {
      const newUser = await userService.register({ data })
      const user = await User.findOne({ email: newUser.data?.email })
      const userId = user?._id.toString() as string
      const deletedUser = await userService.deleteAccount({ _id: userId })

      expect(deletedUser).toBeDefined()
      expect(deletedUser).toHaveProperty('success', true)
    })

    it('Should not find a user to delete and return an error', async () => {
      const deletedUser = await userService.deleteAccount({
        _id: '64f147c6f2336f8adf9b1234'
      })

      expect(deletedUser).toBeDefined()
      expect(deletedUser).toHaveProperty('success', false)
      expect(deletedUser).toHaveProperty('error', 'User not found')
    })

    it('Should return an error and don not delete any user', async () => {
      try {
        await userService.deleteAccount({
          _id: '123'
        })
      } catch (error) {
        expect(error).toBeDefined()
        expect(error).toHaveProperty('reason')
      }
    })
  })
})
