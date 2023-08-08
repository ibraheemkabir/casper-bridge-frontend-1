module.exports = {
    collectCoverage: true,
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.svg$": "<rootDir>/svgTransform.js"
    },
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "<rootDir>/styleMock.js",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileMock.js",

    },
    transformIgnorePatterns: [`/node_modules/(?!ferrum-design-system)`],
    collectCoverageFrom: ['src/**/*.{js,jsx}', 'src/**/*.{ts,tsx}'],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
}