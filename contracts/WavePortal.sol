// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    // txn logs - provide read access to stored data in a contract
    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    constructor() payable {
        console.log("lol smart contract go vroom!");
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s ey buddy: %s", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        // events emit data to txn logs on chain - not accessible to contract
        emit NewWave(msg.sender, block.timestamp, _message);

        uint256 prizeAmount = 0.0001 ether;
        require(
            prizeAmount <= address(this).balance,
            "you're not trying to bankrupt my learning contract are you anon?"
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw from contract.");
    }

    function getAllWaves() public view returns(Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("%d total", totalWaves);
        return totalWaves;
    }
}
