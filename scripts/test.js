const hre = require("hardhat");

const ACCOUNT_ADDR = "0xd8058efe0198ae9dD7D563e1b4938Dcbc86A1F81";
const EP_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const PM_ADDRESS = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

async function main() {
  const account = await hre.ethers.getContractAt("Account", ACCOUNT_ADDR);
  const count = await account.count();
  console.log("Current count", count);

  console.log(
    "Account balance",
    await hre.ethers.provider.getBalance(ACCOUNT_ADDR)
  );

  const ep = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);

  console.log("Account balance on EP", await ep.balanceOf(ACCOUNT_ADDR));
  console.log("Paymaster balance on EP", await ep.balanceOf(PM_ADDRESS));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
