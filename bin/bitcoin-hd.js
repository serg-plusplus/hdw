#!/usr/bin/env node

'use strict'

// A full-featured framework for building command line applications (cli) with node.js,
// including help generation, colored output, verbosity control, custom logger, coercion
// and casting, typos suggestions, and auto-complete for bash/zsh/fish.
// @see https://github.com/mattallty/Caporal.js
const prog = require('caporal')

// package.json file
const pkg = require('../package.json')

prog
  .version(pkg.version)

prog.parse(process.argv)
