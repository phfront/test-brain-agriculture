module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Para suportar módulos CSS
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};