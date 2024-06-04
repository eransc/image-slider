import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.jest.json'  // This can point to a specific tsconfig for Jest if needed
    }
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  // Ensuring that ts-jest handles TypeScript files
    '^.+\\.jsx?$': 'babel-jest'    // Handling for plain JavaScript files, if needed
  },
  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy',  // Make sure the regex is correctly escaped
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js'
  }
};

export default config;
