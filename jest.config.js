module.exports = {
  testEnvironment: "jsdom",
  testMatch: [
    "**/__tests__/**/*.test.js?(x)",
    "**/__tests__/**/*.test.ts?(x)",
    "**/tests/**/*.test.js?(x)",
    "**/tests/**/*.test.ts?(x)",
  ],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {
      tsconfig: "tsconfig.json",
      jsx: "react"
    }],
    "^.+\\.jsx?$": ["@swc/jest", {
      jsc: {
        parser: {
          syntax: "ecmascript",
          jsx: true,
        },
        transform: {
          react: {
            runtime: "automatic"
          }
        }
      }
    }],
  },
  preset: "ts-jest/presets/js-with-ts",
  transformIgnorePatterns: ["/node_modules/(?!(@testing-library)/)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.js"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testPathIgnorePatterns: ["/node_modules/"],
};
