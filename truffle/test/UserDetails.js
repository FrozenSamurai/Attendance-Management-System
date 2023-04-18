const UserDetails = artifacts.require("UserDetails");

contract("UserDetails", () => {
  it("should read newly written values", async () => {
    const userDetailsInstance = await UserDetails.deployed();
    var value = (await userDetailsInstance.read()).toNumber();

    assert.equal(value, 0, "0 wasn't the initial value");

    await userDetailsInstance.write(1);
    value = (await userDetailsInstance.read()).toNumber();
    assert.equal(value, 1, "1 was not written");

    await userDetailsInstance.write(2);
    value = (await userDetailsInstance.read()).toNumber();
    assert.equal(value, 2, "2 was not written");
  });
});
