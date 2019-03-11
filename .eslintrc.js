module.exports = {
  env: {
    browser: true,
    commonjs: false,
    es6: 1
  },
  extends: "airbnb",
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "es2016",
    sourceType: "module"
  },
  globals: {
    document: 1,
    console: 1
  },
  plugins: ["react", "jsx-ally", "import"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "react/jsx-filename-extension": 0,
    "no-unused-vars": ["warn", { vars: "local" }]
  }
};
