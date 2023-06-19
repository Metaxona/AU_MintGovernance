const { ethers } = require("hardhat");

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();
  
  const token = await ethers.getContractAt("MyToken", "0x167F6961D9FaE0f5339F10d898dcE81E55d44903", owner)
  const governor = await ethers.getContractAt("MyGovernor", "0xdE3522bacB69E324126EDD9555aA5231e40DA258", owner )

  const tx = await governor.propose(
    [token.address],
    [0],
    [token.interface.encodeFunctionData("mint", [owner.address, ethers.utils.parseEther("25000")])],
    "Give the owner 25000 more tokens!"
  );
  const receipt = await tx.wait();
  const event = receipt.events.find(x => x.event === 'ProposalCreated');
  const { proposalId } = event.args;

  console.log("Proposal Id: ", proposalId);

  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
