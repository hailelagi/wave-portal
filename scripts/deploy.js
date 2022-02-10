async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const accountBal = await deployer.getBalance();

    console.log("deployer", deployer.address);
    console.log("bal", accountBal.toString());

    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log("wavy addy", (await waveContract).address);
}

async function run() {
    try {
        await main();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

run();