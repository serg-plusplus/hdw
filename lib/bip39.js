'use strict'

// Lodash util
// Creates an object composed of the picked object properties
const _pick = require('lodash.pick')

// Bitcoin BIP39: Mnemonic code for generating deterministic keys.
const bip39 = require('bip39')

// omit aliases from default bip39 wordlists
bip39.wordlistsSimple = _pick(bip39.wordlists, [
  'english',
  'french',
  'italian',
  'spanish',
  'japanese',
  'chinese_simplified',
  'chinese_traditional'
])

/**
 * Generate mnemonic code
 * with human arguments
 * @param {Number} numberOfWords
 * @param {Array} wordlist
 * @return {String}
 */
bip39.generateMnemonicSimple = (numberOfWords, wordlist) => {
  const strength = numberOfWords / 3 * 32
  return bip39.generateMnemonic(
    strength,
    void 0, // fallback to default 'randombytes' function
    wordlist
  )
}

/**
 * Validate mnemonic code
 * if valid ? returns mnemonic : throw error
 * @param {String} mnemonic
 * @return {String}
 */
bip39.throwIfNotValid = code => {
  const isValid = bip39.validateMnemonic(code)
  if (!isValid) {
    throw new Error('Invalid mnemonic code')
  }

  return code
}

module.exports = bip39
