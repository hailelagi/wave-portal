// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    constructor() {
        console.log("lol smart contract go vroom!");
    }

    function wave() public {
        totalWaves += 1;
        console.log("%s ey buddy", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("%d total", totalWaves);
        return totalWaves;
    }
}
