// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   transform: {
//     '^.+\\.(ts|tsx)$': [
//       'ts-jest',
//       {
//         tsconfig: 'tsconfig.json',
//         isolatedModules: true
//       }
//     ],
//   },
//   moduleNameMapper: {
//     // Handle absolute imports & module aliases
//     '^@/(.*)$': '<rootDir>/src/$1',
//     // Mock static assets
//     '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
//   },
//   transformIgnorePatterns: [
//     '/node_modules/(?!(@?react|next)/)', // allow Next.js packages to be transformed
//   ],
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
// };
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};