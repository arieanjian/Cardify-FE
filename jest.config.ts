import type { Config } from "jest";
// import type { JestConfigWithTsJest } from 'ts-jest'

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  transform: {
    // "^.+\\.ts?$": "ts-jest",
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: "node_modules/ts-jest-mock-import-meta",
              options: {
                metaObjectReplacement: {
                  env: {
                    // Replicate as .env.local
                    VITE_API_PATH: "http://localhost:3001",
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
  // moduleDirectories: ["./"],
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules/(?!react-markdown/)"],
  // modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
  // moduleNameMapper: pathsToModuleNameMapper(
  //   compilerOptions.paths /*, { prefix: '<rootDir>/' } */
  // ),
  moduleNameMapper: {
    // "^@/(.*)$": "./src",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  resolver: undefined,
};

export default config;
