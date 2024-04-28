import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules/(?!react-markdown/)"],
  moduleNameMapper: {
    "^@/(.*)$": "./src",
  },
};

export default config;
