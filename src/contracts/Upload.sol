
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.7.0;


contract Upload{
	string imgHash ;

	//Write a function
	function set(string memory _imgHash) public {
		imgHash = _imgHash ;
	}

	function get() public view returns(string memory) {
		return imgHash ;
	}

}