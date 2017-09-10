'use strict'

// Lodash util
// Creates an object composed of the picked object properties
const _pick = require('lodash.pick')

// Bitcoin BIP39: Mnemonic code for generating deterministic keys.
const bip39 = require('bip39')

/**
 * supported languages (keys for 'bip39.wordlists')
 * @exports
 */
const languages = [
  'english',
  'french',
  'italian',
  'spanish',
  'japanese',
  'chinese_simplified',
  'chinese_traditional'
]

/**
 * omit aliases from default bip39 wordlists
 * @exports
 */
const wordlists = _pick(bip39.wordlists, languages)

/**
 * get wordlist by language (helper func)
 * @param {String} language
 * @return {Array} wordlist
 */
const _getWordlistByLanguage = language => {
  if (!(language in wordlists)) {
    throw new Error(`'${language}' language is not supported.`)
  }

  return wordlists[language]
}

/**
 * Generate mnemonic code
 * @param {String} language
 * @param {Number} quantity
 * @return {String} mnemonicCode
 * @exports
 */
const generate = (language, quantity) => {
  const wordlist = _getWordlistByLanguage(language)
  const strength = quantity / 3 * 32
  return bip39.generateMnemonic(
    strength,
    void 0, // fallback to default 'randombytes' function
    wordlist
  )
}

/**
 * Validate mnemonic code
 * @param {String} language
 * @param {String} mnemonicCode
 * @return {Boolean} ?isValid
 * @exports
 */
const validate = (language, mnemonicCode) => {
  const wordlist = _getWordlistByLanguage(language)
  return bip39.validateMnemonic(
    mnemonicCode,
    wordlist
  )
}

module.exports = {
  languages,
  wordlists,

  // methods
  generate,
  validate
}
