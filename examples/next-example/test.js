const coins = require('./coins');

/*
Some test expects generated by:
https://iancoleman.io/bip39/
*/

const tests = [
  {
    check: true,
    coin: 'BTC',
    network: 'mainnet',
    mnemonic: 'sudden expire elegant spend they peanut search giggle battle gas sister atom',
    privateKey: 'L2opBasCx47tgK9h4dP7r9kVRCjyBu7Z47fByBuamYwHYbzbP42g',
    publicKey: '029f7b0a848819c4e19c2282572a821b0a0dc265128f515af292fc84f81c4b1a3f',
    address: '1P8HdnAAFkJDbbKnfV3721KS9cVyX59x5j', // index 0
    // address: '1PtoSLHfgnrhg1piupG1obmvsdLdxeELyC' // index 1
  },
  {
    check: true,
    coin: 'BTC',
    network: 'testnet',
    mnemonic: 'sudden expire elegant spend they peanut search giggle battle gas sister atom',
    privateKey: 'cUA5k263Wd8cA6M4StxyJNdrXs4rKk2h88rxATcHunrxaxtpMMXw',
    publicKey: '02baacab92e5563ca1cb785f412ccf69ef6979d5b6e8b01c01a7e5cc7612051eab',
    address: 'mnkxYF6DZVSeQrQjusHq7xgECTVPp4w24H', // index 0
    // address: 'n1diZdNDBJPhd22vuXQvsqAdsfqhaWcy7R', // index 1
  },
  {
    check: true,
    coin: 'GHOST',
    network: 'testnet',
    mnemonic: 'praise you muffin lion enable neck grocery crumble super myself license ghost',
    //privateKey: '...', // ?
    //publicKey: '', // ?
    address: 'Xa6SpohTZZAKrbqoZjSFkPY34hbCZJy9RG'
  },
  {
    check: true,
    coin: 'NEXT',
    network: 'mainnet',
    mnemonic: 'sudden expire elegant spend they peanut search giggle battle gas sister atom',
    /*
      Account generated by reference node `next-qt`
      > next-qt --usehd=1 --mnemonic="sudden expire elegant spend they peanut search giggle battle gas sister atom"
      File -> Receiving Addresses
    */
    //privateKey: '...', // ?
    //publicKey: '', // ?
    address: 'XJYfa9XF9zYkLkHmQfjvpAEsV2rBiPUB5P', // index 0
    //address 'XX6QMNnYRpks9YzmkFbmpMyHDXzowEJDjc', // index 1
  },
  {
    check: true,
    coin: 'LTC',
    network: 'mainnet',
    mnemonic: 'sudden expire elegant spend they peanut search giggle battle gas sister atom',
    privateKey: 'T8LYWa1wvC317PSytdpHBbzviijKuuqyLywT7FCEXupEuAuUwPPo',
    publicKey: '026e9e26d004b5fb1da69e7349c32642005cc800002121ef48dad30a212b1dd47b',
    address: 'LggM6A4J2NzpZYPzMEGLCBSpRJZrcMML8n', // index 0
    // address: 'LfaPnMj5jYcGMMD6fiXbCq9y1aR6oa5qt1', // index 1
  },
  {
    check: true,
    coin: 'LTC',
    network: 'testnet',
    mnemonic: 'sudden expire elegant spend they peanut search giggle battle gas sister atom',
    privateKey: 'cUA5k263Wd8cA6M4StxyJNdrXs4rKk2h88rxATcHunrxaxtpMMXw',
    publicKey: '02baacab92e5563ca1cb785f412ccf69ef6979d5b6e8b01c01a7e5cc7612051eab',
    address: 'mnkxYF6DZVSeQrQjusHq7xgECTVPp4w24H', // index 0
    // address: 'n1diZdNDBJPhd22vuXQvsqAdsfqhaWcy7R', // index 1
  },
]

tests.forEach(test => {
  if (!test.check) {
    return
  }
  console.log('Test: mnemonic ⮕ address,', test.coin, test.network)
  account = coins[test.coin][test.network].accountFromMnemonic(test.mnemonic)
  const received = account.address.toString()
  const expected = test.address
  if (received == expected) {
    console.log('OK')
  } else {
    console.log(`(!!!) not OK, expected ${expected}, received ${received}`)
  }
})