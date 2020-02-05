require('dotenv').config();
require('babel-register');
require('babel-polyfill');
const Web3 = require('web3');

const HDWalletProvider = require('truffle-hdwallet-provider');

const providerWithMnemonic = (mnemonic, rpcEndpoint) =>
    new HDWalletProvider(mnemonic, rpcEndpoint, 0, 2);

const infuraProvider = network => providerWithMnemonic(
    process.env.MNEMONIC_DEPLOY || '',
    network === 'rinkeby' ?
        `https://${network}.infura.io/${process.env.INFURA_API_KEY}` :
        'https://precisely-many-phoenix.quiknode.io/1bf3d5a2-8b71-45c7-817f-745719b8e44c/ySMyhjiLUZ8zerA_BfAQiA==/'
);

const web3 = new Web3('');
const gasPrice = web3.toWei(process.env.GAS_PRICE_GWEI, "gwei");

module.exports = {
    networks: {
        development: {
            host: 'localhost',
            port: 8545,
            gas: 6700000,
            network_id: '*', // eslint-disable-line camelcase
        },
        rinkeby: {
            provider: infuraProvider('rinkeby'),
            network_id: 4, // eslint-disable-line camelcase
            gasPrice: gasPrice,
            gas: 6700000
        },
        live: {
            provider: infuraProvider('mainnet'),
            network_id: 1, // eslint-disable-line camelcase
            gasPrice: gasPrice,
            gas: 6700000
        }
    },
    mocha: {
        reporter: 'eth-gas-reporter',
        reporterOptions : {
            currency: 'USD',
            gasPrice: 20
        }
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};
