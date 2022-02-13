async function main(){
    const [owner, randomPerson] = await hre.ethers.getSigners()
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy(
        {value: hre.ethers.utils.parseEther("0.1")}
    );
    await waveContract.deployed();

    console.log("contract deployed to address =>", waveContract.address);
    console.log("contract deployed (owner) =>", owner.address);

    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log(
        "Initial bal",
        hre.ethers.utils.formatEther(contractBalance)
    );

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(Number(waveCount))

    let waveTxn = await waveContract.wave("Hi hi test!");
    await waveTxn.wait();


    waveTxn = await waveContract.connect(randomPerson).wave(":0 test twooo!");
    await waveTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );

    console.log(
        "Last bal after two tx",
        hre.ethers.utils.formatEther(contractBalance)
    );

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