const ReviewContract = artifacts.require("./ReviewContract.sol");

require('dotenv').config();
const delay = require('delay');

const paused = parseInt( process.env.DELAY_MS || "60000" );

const wait = async (param) => {console.log("Delay " + paused); await delay(paused); return param;};

module.exports = function(deployer) {
    deployer.then(async () => {
        await wait();

        await wait(await deployer.deploy(ReviewContract));
    });
};
