pragma solidity ^0.4.24;

import "./Access/Ownable.sol";
import "./ReviewStorage/ReviewStorage.sol";


/**
 * @title ReviewContract
 * @dev The ReviewContract contract has an   .
 */
contract ReviewContract is Ownable, ReviewStorage {

    /**
    * @dev The ReviewContract constructor
    */
    constructor () public { }


    /**
     * @dev Saves the hash to storage if it doesn't already exist
     * @param _reviewHash  Verifiable hash.
     * It will not be possible to call the functions with the `onlyOwner`
     * modifier anymore.
     */
    function addNewReviewHash(string  _reviewHash) public onlyOwner {
        require(!getExistingReview(_reviewHash), "Index hasn't exist");
        clientReviews[_reviewHash] = true;
        indexReview.push(string(_reviewHash));
        emit NewReviewHash(_reviewHash, now);
    }

    /**
     * @dev Fullback call
     */
    function () public payable {
        revert("Contract cannot be funded");
    }
}
