pragma solidity ^0.4.24;


/**
 * @title ReviewStorage
 * @dev The ReviewStorage contract has an  .
 */
contract ReviewStorage {

    mapping (string => bool) internal  clientReviews;
    string[] public indexReview;

    event NewReviewHash(string _reviewHash, uint256 _createdTime);

    /**
     * @dev Returns whether this hash exists or not.
     * @param _hashReview Verifiable hash.
     */
    function getExistingReview(string _hashReview) public view returns(bool) {
        if (clientReviews[_hashReview] == true) {
            return true;
        }
        else
            return false;
    }

    /**
    * @dev Returns hash by index.
    * @param _index  Verifiable index.
    */
    function getReviewHash(uint256 _index) public view returns(string) {
        require(_index < indexReview.length, "Index hasn't exist");
        return indexReview[_index];
    }

    /**
     * @dev Returns the number of saved hashes.
    */
    function totalHashes() public view returns(uint256) {
        return indexReview.length;
    }
}
