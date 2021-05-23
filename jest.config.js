module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@exmpl/(.*)": "<rootDir>/src/$1"
  },
  "setupFilesAfterEnv": ["<rootDir>/src/test/setup.js"]
};