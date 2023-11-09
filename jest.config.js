module.exports = {
  transform: {
    '\\.[jt]s$': 'babel-jest',
    '\\.txt$': '<rootDir>/jest.readTransformer.js',
  },
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/templates/'],
};
