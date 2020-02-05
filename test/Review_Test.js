// test/.Review_Test.js
const ReviewContract = artifacts.require("ReviewContract");

const ETHER = 10**18;

contract("ReviewContract", accounts => {

    const [firstAccount, secondAccount, thirdAccount] = accounts;

    let reviewHashContract;

    beforeEach(async () => {
        reviewHashContract = await ReviewContract.new();
    });


    it("#1 should initialize correctly", async () => {
        assert.equal(await reviewHashContract.owner.call(), firstAccount);
    });


    it("#2 should transfer to Ownerships", async () => {

        try {
            await reviewHashContract.transferOwnership(secondAccount, {from: secondAccount})
            assert.fail();
        } catch (err) {
            assert.ok(/revert/.test(err.message));
        }
        try {
            await reviewHashContract.transferOwnership(thirdAccount, {from: thirdAccount})
            assert.fail();
        } catch (err) {
            assert.ok(/revert/.test(err.message));
        }

        await reviewHashContract.transferOwnership(secondAccount, {from: firstAccount})

        try {
            await reviewHashContract.transferOwnership(firstAccount, {from: firstAccount})
            assert.fail();
        } catch (err) {
            assert.ok(/revert/.test(err.message));
        }
        assert.equal(await reviewHashContract.owner.call(), secondAccount);

        try {
            await reviewHashContract.renounceOwnership({from: firstAccount})
            assert.fail();
        } catch (err) {
            assert.ok(/revert/.test(err.message));
        }

        await reviewHashContract.renounceOwnership({from: secondAccount})

        try {
            await reviewHashContract.transferOwnership(firstAccount, {from: firstAccount})
            assert.fail();
        } catch (err) {
            assert.ok(/revert/.test(err.message));
        }
        try {
            await reviewHashContract.transferOwnership(secondAccount, {from: secondAccount})
            assert.fail();
        } catch (err) {
            assert.ok(/revert/.test(err.message));
        }
        try {
            await reviewHashContract.transferOwnership(thirdAccount, {from: thirdAccount})
            assert.fail();
        } catch (err) {
            assert.ok(/revert/.test(err.message));
        }
    });

    it("#3 should be created 3 review", async () => {
        try {
            await reviewHashContract.addNewReviewHash("4h45fef0", {from: secondAccount});
            assert.fail();
        } catch (err) {
            assert.ok(/revert/.test(err.message));
        }

        await reviewHashContract.addNewReviewHash("4h45fef0", {from: firstAccount});
        await reviewHashContract.addNewReviewHash("2h34fef0", {from: firstAccount});
        await reviewHashContract.addNewReviewHash("1hff0ef8", {from: firstAccount});

        try {
            await reviewHashContract.addNewReviewHash("4h45fef0", {from: firstAccount});
            assert.fail();
        } catch (err) {
            assert.ok(/revert/.test(err.message));
        }

        assert.equal(await reviewHashContract.totalHashes.call(), 3);
    });

    it("#4 should be send 1 ETH", async () => {

        try {
            await reviewHashContract.sendTransaction({from: secondAccount, value: 2 * ETHER});
            assert.fail();
        } catch (err) {
            assert.ok(/revert/.test(err.message));
        }

        try {
            await reviewHashContract.sendTransaction({from: firstAccount, value: 1 * ETHER});
            assert.fail();
        } catch (err) {
            assert.ok(/revert/.test(err.message));
        }

        try {
            await reviewHashContract.sendTransaction({from: thirdAccount, value: 1 * ETHER});
            assert.fail();
        } catch (err) {
            assert.ok(/revert/.test(err.message));
        }
    });

    it("#5 should be return hashes for index",  async () => {
        await reviewHashContract.addNewReviewHash("5645fef0", {from: firstAccount});
        await reviewHashContract.addNewReviewHash("ff34fef0", {from: firstAccount});
        await reviewHashContract.addNewReviewHash("00ff0ef8", {from: firstAccount});

        assert.equal(await reviewHashContract.totalHashes.call(), 3, {from: firstAccount});
        assert.equal(await reviewHashContract.totalHashes.call(), 3, {from: secondAccount});
        assert.equal(await reviewHashContract.totalHashes.call(), 3, {from: thirdAccount});

        assert.equal(await reviewHashContract.getReviewHash.call(0), '5645fef0', {from: firstAccount});
        assert.equal(await reviewHashContract.getReviewHash.call(1), 'ff34fef0', {from: secondAccount});
        assert.equal(await reviewHashContract.getReviewHash.call(2), '00ff0ef8', {from: thirdAccount});

        try {
            await reviewHashContract.getReviewHash(3, {from: firstAccount});
            assert.fail();
        } catch (err) {
            assert.ok(/revert/.test(err.message));
        }
    });

    it("#6 should be validate existing hash", async () => {
        await reviewHashContract.addNewReviewHash("5645fef0", {from: firstAccount});
        await reviewHashContract.addNewReviewHash("ff34fef0", {from: firstAccount});
        await reviewHashContract.addNewReviewHash("00ff0ef8", {from: firstAccount});

        assert.equal(await reviewHashContract.getExistingReview("5645fef0"), true, {from: thirdAccount});
        assert.equal(await reviewHashContract.getExistingReview("ff34fef0"), true, {from: thirdAccount});
        assert.equal(await reviewHashContract.getExistingReview("00ff0ef8"), true, {from: thirdAccount});
        assert.equal(await reviewHashContract.getExistingReview.call("111fff11"), false, {from: thirdAccount});
    });

});
