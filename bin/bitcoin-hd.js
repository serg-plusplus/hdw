#!/usr/bin/env node

'use strict'

// A full-featured framework for building command line applications (cli) with node.js,
// including help generation, colored output, verbosity control, custom logger, coercion
// and casting, typos suggestions, and auto-complete for bash/zsh/fish.
// @see https://github.com/mattallty/Caporal.js#api
const prog = require('caporal')

// package.json file
const pkg = require('../package.json')

prog
  .version(pkg.version)
  .logger(prog.logger())
  /**
   * 'send' command
   */
  .command('send', 'Transfer coins (push transaction into current network)')
  .argument('<address>', 'Destination address')
  .option('-n, --network <network>', 'Network')
  .option('-a, --amount <amount>')
  .action((args, opts, logger) => {
    logger.info({
      args,
      opts
    })
  })

prog.parse(process.argv)
