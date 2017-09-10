#!/usr/bin/env node

'use strict'

// 🐦 ⚡️ Bluebird is a full featured promise library with unmatched performance.
const Promise = require('bluebird')

// 🖍 Terminal string styling done right
const c = require('chalk')

// CLI app helper
const meow = require('meow')

// A collection of common interactive command line user interfaces.
const inquirer = require('inquirer')

// [LIB] mnemonic tools (wrapped bip39 module)
const mnemonic = require('../lib/mnemonic')

// Can either be a string/array that is the help or an options object.
// @see https://github.com/sindresorhus/meow#api
const cli = meow(`
  Usage:
    ${c.yellow('$')} hdw-mnemonic <command>

  Commands:
    ${c.bold(c.green('generate'))} ${c.gray('Generate new mnemonic code')}
    ${c.bold(c.green('validate'))} ${c.gray('Validate exist mnemonic code')}

  Examples:
    ${c.yellow('$')} hdw-mnemonic generate
    ${c.green('?')} Choose language: ${c.white('french')}
    ${c.green('?')} Choose number of words: ${c.white('12')}
    ardeur végétal épine mouche tambour sincère carabine brusque exact rayonner docteur violon

    ${c.yellow('$')} hdw-mnemonic validate
    ${c.green('?')} Choose language: ${c.white('french')}
    ${c.green('?')} Type your mnemonic code: ${c.white(
  'ardeur végétal épine mouche tambour sincère carabine brusque exact rayonner docteur violon'
)}
    ${c.green('* Valid')}
`)

// process with args
try {
  const command = cli.input[0]
  switch (command) {
    case 'generate':
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'language',
            message: 'Choose language:',
            choices: mnemonic.languages
          },
          {
            type: 'list',
            name: 'quantity',
            message: 'Choose number of words:',
            choices: ['12', '15', '18', '21', '24'],
            filter: nOfWords => +nOfWords
          }
        ])
        .then(({ language, quantity }) => {
          try {
            const mnemonicCode = mnemonic.generate(language, quantity)
            return Promise.resolve(mnemonicCode)
          } catch (err) {
            return Promise.reject(err)
          }
        })
        .then(console.log)
        .catch(console.error)
      break
    case 'validate':
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'language',
            message: 'Choose language:',
            choices: mnemonic.languages
          },
          {
            type: 'input',
            name: 'mnemonicCode',
            message: 'Type your mnemonic code:'
          }
        ])
        .then(({ language, mnemonicCode }) => {
          try {
            const mnemonicIsValid = mnemonic.validate(language, mnemonicCode)
            const conclusion = mnemonicIsValid
              ? c.green('* Valid')
              : c.red('* Unvalid')

            return Promise.resolve(conclusion)
          } catch (err) {
            return Promise.reject(err)
          }
        })
        .then(console.log)
        .catch(console.error)
      break
    default:
      cli.showHelp()
      break
  }
} catch (err) {
  console.error(err)
}
