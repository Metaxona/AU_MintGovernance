const { ethers } = require("hardhat");
const { toUtf8Bytes, keccak256, parseEther} = ethers.utils;

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();
  
  const token = await ethers.getContractAt("MyToken", "0x167F6961D9FaE0f5339F10d898dcE81E55d44903", owner)
  const governor = await ethers.getContractAt("MyGovernor", "0xdE3522bacB69E324126EDD9555aA5231e40DA258", owner )

  await governor.execute(
    [token.address],
    [0],
    [token.interface.encodeFunctionData("mint", [owner.address, parseEther("25000")])],
    keccak256(toUtf8Bytes("Give the owner 25000 more tokens!"))
  );
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
