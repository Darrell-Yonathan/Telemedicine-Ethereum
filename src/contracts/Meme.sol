// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.7.0;


contract Meme{
	string memeHash ;

	//Write a function
	function set(string memory _memeHash) public {
		memeHash = _memeHash ;
	}

	function get() public view returns(string memory) {
		return memeHash ;
	}

}