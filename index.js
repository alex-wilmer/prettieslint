#!/usr/bin/env node

let { exec } = require('child_process')
let { promisify } = require('util')
let fs = require('fs')
let path = require('path')

exec = promisify(exec)

let config = fs.readFileSync(path.join(__dirname, '.eslintrc.js'))

let deps = [
  'babel-eslint',
  'eslint',
  'eslint-config-prettier',
  'eslint-plugin-babel',
  'eslint-plugin-prettier',
  'prettier',
].join(' ')

console.log('creating .eslintrc.js')

fs.writeFile('.eslintrc.js', config, async () => {
  console.log('Installing prettier & eslint modules')
  if (fs.existsSync('yarn.lock')) {
    await exec(`yarn add -D ${deps}`)
  } else {
    await exec(`npm i --dev ${deps}`)
  }
  console.log(`🎉 prettier and eslint configured!`)
})
