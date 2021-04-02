module.exports = {
  roots: ['src/'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\', '__tests__'],
  testMatch: ['**/*.spec.js'],
};
