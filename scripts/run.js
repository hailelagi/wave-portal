async function main(){
    const [owner, randomPerson] = await hre.ethers.getSigners()
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log("contract deployed to address =>", waveContract.address);
    console.log("contract deployed (owner) =>", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(Number(waveCount))

    let waveTxn = await waveContract.wave("Hi hi test!");
    await waveTxn.wait();

    waveTxn = await waveContract.connect(randomPerson).wave(":0 test twooo!");
    await waveTxn.wait();

    let allWaves = await waveContract.getAllWaves();

    console.log(allWaves);
}

async function runMain() {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();