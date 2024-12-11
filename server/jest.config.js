const { resolve } = require('path')
const { pathsToModuleNameMapper } = require('ts-jest')

module.exports = {
  rootDir: resolve(__dirname),
  displayName: 'root-tests',
  testMatch: ['<rootDir>/__test__/**/*.test.ts'],
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/__test__/config/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  }
}
