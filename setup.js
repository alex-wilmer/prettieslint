let fs = require('fs')

let config =
`
module.exports = {
  extends: ['prettier', 'react-app'],
  plugins: ['prettier', 'babel'],
  parser: 'babel-eslint',
  rules: {
    'prettier/prettier': [
      1,
      {
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
  },
}

`

fs.writeFile('.eslintrc.js', config, () => {
  console.log(`🎉 prettier and eslint configured for node and / or react!`)
})
