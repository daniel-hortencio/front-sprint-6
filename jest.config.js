module.exports = {
    testPathIgnorePatterns: ['/node_modules'],
    setupFilesAfterEnv: [
        "<rotDir>/src/tests/setupTests.ts"
    ],
    transform: {
        "^.+\\(js|jsx|ts|tsx)": "<rootDir>/node_modules/babel-jest"
    },
    testEnvironment: 'jsdom',
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname',
    ],
    moduleNameMapper: {
        "\\.(scss|css|sass)$": 'identity-obj-proxy'
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{tsx}",
        "!src/**/*.test.{tsx}"
    ],
    coverageReporters: ["lcov", "json"]
}