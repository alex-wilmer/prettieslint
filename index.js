#!/usr/bin/env node

let { exec } = require('child_process')
let { promisify } = require('util')
let fs = require('fs-extra')
let path = require('path')
let ask = require('inquirer')

exec = promisify(exec)

let config = fs.readJsonSync(path.join(__dirname, '.eslintrc'))

let deps = [
  'babel-eslint',
  'eslint',
  'eslint-config-prettier',
  'eslint-plugin-babel',
  'eslint-plugin-prettier',
  'prettier',
].join(' ')

console.log('writing config to package.json')

const pkgPath = path.join(process.cwd(), 'package.json')
const pkg = require(pkgPath)
pkg.eslint = config
;(async function() {
  const { extend } = await ask.prompt({
    name: 'extend',
    type: 'confirm',
    message: 'Would you like to extend from eslint:recommended?',
    default: true,
  })

  if (extend) pkg.eslint.extends = 'eslint:recommended'

  fs.writeJson(pkgPath, pkg, { spaces: 2 }, async () => {
    console.log('Installing prettier & eslint modules')
    if (fs.existsSync('yarn.lock')) {
      await exec(`yarn add -D ${deps}`)
    } else {
      await exec(`npm i --dev ${deps}`)
    }
    console.log(`🎉 prettier and eslint configured!`)
  })
})()
