const { ethers } = require("hardhat");

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();

  const token = await ethers.getContractAt("MyToken", "0x167F6961D9FaE0f5339F10d898dcE81E55d44903", owner)
//   const governor = await ethers.getContractAt("MyGovernor", "0xdE3522bacB69E324126EDD9555aA5231e40DA258", owner )

  const delegated = await token.delegate(owner.address);
  console.log("delegated: ", delegated);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
