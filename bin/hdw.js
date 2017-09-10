#!/usr/bin/env node

'use strict'

// A full-featured framework for building command line applications (cli) with node.js,
// including help generation, colored output, verbosity control, custom logger, coercion
// and casting, typos suggestions, and auto-complete for bash/zsh/fish.
// @see https://github.com/mattallty/Caporal.js#api
const prog = require('caporal')

// A collection of common interactive command line user interfaces.
// @see https://github.com/SBoudrias/Inquirer.js#documentation
const inquirer = require('inquirer')

// package.json file
const pkg = require('../package.json')

// mnemonic tools (wrapped bip39 module)
const mnemonic = require('../lib/mnemonic')

prog
  .version(pkg.version)
  /**
   * 'generate' command
   */
  .command('generate-mnemonic', 'Generate new mnemonic code')
  .action((args, opts, logger) => {
    const questions = [
      {
        type: 'list',
        name: 'language',
        message: 'Choose language:',
        choices: mnemonic.languages
      },
      {
        type: 'list',
        name: 'numberOfWords',
        message: 'Choose number of words:',
        choices: ['12', '15', '18', '21', '24'],
        filter: nOfWords => +nOfWords
      }
    ]

    inquirer
      .prompt(questions)
      .then(({ language, numberOfWords }) => {
        try {
          logger.info(mnemonic.generate(language, numberOfWords))
        } catch (err) {
          logger.error({ err }) // !todo, remove caporal.js
        }
      })
      .catch(err => logger.error({ err })) // !todo, remove caporal.js
  })
/**
   * 'new' command
   */
// .command('new', 'Create new HD(hierarchical deterministic) wallet')
// .argument(
//   '<mnemonic>',
//   'Mnemonic code. bip39',
//   mnn => {
//     const isValid = mnemonic.validate(code)
//   }
// )
// .option('-n, --network <network>', 'Default network for this wallet')
/**
   * 'send' command
   */
// .command('send', 'Transfer coins (push transaction into current network)')
// .argument('<address>', 'Destination address')
// .option('-n, --network <network>', 'Network')
// .option('-a, --amount <amount>')
// .action((args, opts, logger) => {
//   logger.info({ args, opts })
// })

// parse and match CLI argv
prog.parse(process.argv)
