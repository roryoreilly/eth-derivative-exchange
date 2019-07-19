const Dai = artifacts.require("Dai");

contract("Dai tests", async accounts => {
    let instance;
    before(async () => {
        instance = await Dai.deployed();
    });

    it("transfer coins from one acocunt to another", async () => {
        let balanceBefore = await instance.balanceOf.call(accounts[0]);
        console.log(balanceBefore.toString());
        await instance.transferFrom(accounts[1], accounts[0], "1");
        let balanceAfter = await instance.balanceOf.call(accounts[0]);
        console.log(balanceAfter.toString());
        assert(balanceBefore > balanceAfter);
    });
});
