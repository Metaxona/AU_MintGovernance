const { ethers } = require("hardhat");

async function main() {
    try{
        const [owner, otherAccount] = await ethers.getSigners();

        const token = await ethers.getContractAt("MyToken", "0x167F6961D9FaE0f5339F10d898dcE81E55d44903", owner)
        const governor = await ethers.getContractAt("MyGovernor", "0xdE3522bacB69E324126EDD9555aA5231e40DA258", owner )

        const delegated = await token.delegate(owner.address);
        
        const proposalId = ethers.BigNumber.from("72361924675510367261392043923066936858501264095844762359180488888103014539297");
      
        console.log("Proposal Id: ", proposalId);
              
        const tx = await governor.castVote(proposalId, ethers.utils.parseEther(1));      
        
        console.log("voting: ", tx)
    }
    catch(e){
        console.log(e);
    }
  

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
