'use strict'

// Lodash util
// Creates an object composed of the picked object properties
const _pick = require('lodash.pick')

// Bitcoin BIP39: Mnemonic code for generating deterministic keys.
const bip39 = require('bip39')

// supported languages
// and keys for 'bip39.wordlists'
const languages = [
  'english',
  'french',
  'italian',
  'spanish',
  'japanese',
  'chinese_simplified',
  'chinese_traditional'
]

// omit aliases from default bip39 wordlists
const wordlists = _pick(bip39.wordlists, languages)

/**
 * Generate mnemonic code
 * @param {String} language
 * @param {Number} numberOfWords
 * @return {String} mnemonicCode
 */
const generate = (language, numberOfWords) => {
  const wordlist = wordlists[language]
  if (wordlist === void 0) {
    throw new Error(`'${language}' language is not supported.`)
  }

  const strength = numberOfWords / 3 * 32
  return bip39.generateMnemonic(
    strength,
    void 0, // fallback to default 'randombytes' function
    wordlist
  )
}

/**
 * Validate mnemonic code
 * @param {String} mnemonicCode
 * @return {Boolean} ?isValid
 */
const validate = mnemonicCode =>
  bip39.validateMnemonic(mnemonicCode)

module.exports = {
  languages,
  wordlists,

  // methods
  generate,
  validate
}
