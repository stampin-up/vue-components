module.exports = {
  preset: 'ts-jest',
  verbose: true,
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue' // .vue file support
  ],
  coverageThreshold: {
  },
  collectCoverageFrom: [
  ],
  transform: {
    // process '*.vue' files with `vue-jest`
    '.*\\.(vue)$': 'vue-jest',
    // process '.ts' files with ts-jest
    '^.+\\.tsx?$': 'ts-jest'
    // stub assets
  },
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  // alias support
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts']
}
