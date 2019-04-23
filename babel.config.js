const presets = [
  "@babel/preset-env",
  "@babel/preset-react",
]

module.exports = {
  presets,
  overrides: [
    {
      test: /\.vue/,
      presets: [
        ["@vue/babel-preset-jsx",{ jsxPragma: "h" }],
      ]
    }
  ]
}