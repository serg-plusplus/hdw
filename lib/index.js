'use strict'

// Bitcoin-related functions implemented in pure JavaScript
// @see https://github.com/bitcoinjs/bitcoinjs-lib
const bitcoinjsLib = require('bitcoinjs-lib')

// Mnemonic code for generating deterministic keys
// @see https://github.com/bitcoinjs/bip39
const bip39 = require('bip39')

// runtime constants
const MNEMONIC = 'spin call crunch enough cable try release anchor life run october north page invest gas'
const PASSPHRASE = 'kek'

const bitcoinjsNetwork = bitcoinjsLib.networks.bitcoin
const bip44CoinTypeIndex = 0 // bitcoin mainnet
const accountIndex = 0

const seedBuffer = bip39.mnemonicToSeed(MNEMONIC, PASSPHRASE)
const accountHdNode = bitcoinjsLib.HDNode
  .fromSeedBuffer(seedBuffer, bitcoinjsNetwork)
  .deriveHardened(44) // purpose
  .deriveHardened(bip44CoinTypeIndex) // coin_type
  .deriveHardened(accountIndex) // account

const externalHdNode = accountHdNode.derive(0)
const internalHdNode = accountHdNode.derive(1)

console.log(externalHdNode.derive(0).getAddress())
