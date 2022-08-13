module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testRegex: '(\\.(test|spec))\\.(ts|tsx|js)$',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['<rootDir>/src', 'node_modules'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/', '/documentation/'],
};
