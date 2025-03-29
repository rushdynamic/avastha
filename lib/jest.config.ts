import { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "jsdom", // Needed for testing React hooks
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Global test setup
    modulePathIgnorePatterns: ["<rootDir>/dist/"], // Ignore built files
    coveragePathIgnorePatterns: ["/node_modules/", "/dist/"] // Ignore coverage from irrelevant files
};

export default config;
