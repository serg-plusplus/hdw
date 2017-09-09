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

// bip39 with few wrapped methods
const bip39 = require('../lib/bip39')

prog
  .version(pkg.version)
  .logger(prog.logger())
  /**
   * 'generate' command
   */
  .command('generate-mnemonic', 'Generate new mnemonic code')
  .action((args, opts, logger) => {
    const questions = [
      {
        type: 'list',
        name: 'wordlist',
        message: 'Choose language:',
        choices: Object.keys(bip39.wordlistsSimple),
        filter: key => bip39.wordlists[key]
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
      .then(answers => {
        try {
          logger.info(
            bip39.generateMnemonicSimple(
              answers.numberOfWords,
              answers.wordlist
            )
          )
        } catch (err) {
          console.error(err)
        }
      })
      .catch(console.error)
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
  .command('send', 'Transfer coins (push transaction into current network)')
  .argument('<address>', 'Destination address')
  .option('-n, --network <network>', 'Network')
  .option('-a, --amount <amount>')
  .action((args, opts, logger) => {
    logger.info({ args, opts })
  })

// parse and match CLI argv
prog.parse(process.argv)
