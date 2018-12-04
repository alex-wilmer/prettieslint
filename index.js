#!/usr/bin/env node

let { exec } = require('child_process')
let { promisify } = require('util')
let fs = require('fs')
const Ora = require('ora')

exec = promisify(exec)

let config = `
module.exports = {
  extends: ['prettier'],
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
`.trim()

let deps = [
  'babel-eslint',
  'eslint',
  'eslint-config-prettier',
  'eslint-plugin-babel',
  'eslint-plugin-prettier',
  'prettier',
].join(' ')

let addWorkspaceFlag = false

// Handle Lerna monorepos
if (fs.existsSync('lerna.json')) {
  console.log('Lerna monorepo detected...')
  const lernaConfig = JSON.parse(fs.readFileSync('lerna.json', 'utf8'))
  addWorkspaceFlag = lernaConfig.useWorkspaces
}

// Handle Yarn workspaces
const packageJSON = JSON.parse(fs.readFileSync('package.json', 'utf8'))
if (packageJSON.workspaces) {
  console.log('Yarn workspaces detected...')
  addWorkspaceFlag = true
}

console.log('Creating .eslintrc.js...')

fs.writeFile('.eslintrc.js', config, async () => {
  const spinner = new Ora('Installing prettier & eslint modules...')
  spinner.start()
  if (fs.existsSync('yarn.lock')) {
    await exec(`yarn add -D ${addWorkspaceFlag && '-W'} ${deps}`)
  } else {
    await exec(`npm i --dev ${deps}`)
  }
  spinner.succeed()
  console.log(`🎉 prettier and eslint configured!`)
})
