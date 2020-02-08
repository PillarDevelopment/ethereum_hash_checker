# Smart Contract – Medihealy Inc.
## Specification
There is an Ethereum based Smart-Contract to store and verify legitimacy of the users' reviews on clinics.

<b>Blockchain:</b> Ethereum

<b>Type:</b> ERC 20

<b>Contract Address:</b> `0x699f8B2af6c948d976f9586254466263D6aC1AA6` ([rinkeby testnet](https://rinkeby.etherscan.io/address/0x699f8b2af6c948d976f9586254466263d6ac1aa6#code))
#### Main Functions:
1. Array with records – hashes of the reviews;
2. Add a new record to the table. Only for Smart Contract Owner;
3. Read records from the Array. For all users.

### How it works
1. We have a review on the website:

![alt text](https://github.com/PillarDevelopment/ethereum_hash_checker/blob/master/img/1.png)

2. From this review and date&time we create MD5 (or any other) hash sum I
used this website for example):

![alt text](https://github.com/PillarDevelopment/ethereum_hash_checker/blob/master/img/2.png)

3. We've got the hash: `99b10ff3ee533ac789ffcaa1ce6c3c3a`

4. On the Etherscan we can find our contract and methods to interact with it:

![alt text](https://github.com/PillarDevelopment/ethereum_hash_checker/blob/master/img/3.png)

5. Logged in as an owner we can put our hash to the Smart Contract using method:
`addNewReviewHash`

![alt text](https://github.com/PillarDevelopment/ethereum_hash_checker/blob/master/img/4.png)

6. Users can a the hash of any review using the same encryption method and
then verify it on Etherscan using method:
`getExistingReview`

![alt text](https://github.com/PillarDevelopment/ethereum_hash_checker/blob/master/img/5.png)

7. Also users can check the number of reviews' hashes on the Smart Contract
and get any of these by Index using methods:
`totalHashes`
and
`indexReview`

![alt text](https://github.com/PillarDevelopment/ethereum_hash_checker/blob/master/img/6.png)

## How build source code
Methods:
### Build from source code:
```
git clone https://github.com/PillarDevelopment/ethereum_hash_checker.git
cd ethereum_hash_checker
npm install
```

### Application binary interface(ABI):
```
truffle test
```
### For test:
```
ganache-cli
truffle test
```

### For deploy in local:
```
truffle test
```

### For deploy in testNet Rinkeby:
```
truffle migrate --network rinkeby
```

### For deploy in Mainnet:
```
truffle migrate --network live
```

### All configs with interfaces save:
```
 cd config
```

## API Documentation

### transferOwnership();
Allows the current owner to transfer control of the contract to a newOwner.
##### parameters:
`address` => `_newOwner`. The address to transfer ownership to.
##### returns
`Event` OwnershipTransferred(address previousOwner, address newOwner);
##### example
```
transferOwnership(0x2fd852c9a9aBb66788F96955E9928aEF3D71aE98);
    emit OwnershipTransferred(0x4F31B1Eb1bB09Bc5E1c9aD80336b61dDeB867F57, 
                              0x2fd852c9a9aBb66788F96955E9928aEF3D71aE98);
```

### renounceOwnership();
Allows the current owner to relinquish control of the contract.
@notice Renouncing to ownership will leave the contract without an owner.
It will not be possible to call the functions with the `onlyOwner` modifier anymore.
##### returns
`Event` OwnershipRenounced(address previousOwner);
##### example
```
renounceOwnership();
    emit OwnershipTransferred(0x2fd852c9a9aBb66788F96955E9928aEF3D71aE98);
```

### addNewReviewHash();
Saves the hash to storage if it doesn't already exist
##### parameters
`string` => `_reviewHash`. Verifiable hash.
##### returns
`Event` NewReviewHash(string _reviewHash, uint256 _createdTime);

##### example
```
addNewReviewHash("ff23cf51");
    emit NewReviewHash("ff23cf51");
```

### getExistingReview();
Returns whether this hash exists or not.
##### parameters
`string` => `_hashReview`. Verifiable hash.
##### returns
`Bool` true / false.
##### example
```
getExistingReview("ff23cf51");
    true
```

### getReviewHash();
Returns hash by index.
##### parameters
`uint256` => `_index`. Verifiable index.
##### returns
`String` Hash by index.
##### example
```
getReviewHash(2);
    "fa36ba12";
```

### totalHashes();
##### parameters
##### returns
`Uint256` Number of saved hashes.
##### example
```
totalHashes()
    23;
```
