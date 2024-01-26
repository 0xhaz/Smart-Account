const hre = require("hardhat");

const ACCOUNT_ADDR = "0x2b961E3959b79326A8e7F64Ef0d2d825707669b5";
const EP_ADDRESS = "0x68B1D87F95878fE05B998F19b66F4baba5De1aed";
const PM_ADDRESS = "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c";

async function main() {
  const [signer0] = await hre.ethers.getSigners();
  const signature = signer0.signMessage(
    hre.ethers.getBytes(hre.ethers.id("wee"))
  );

  const Test = await hre.ethers.getContractFactory("Test");

  const test = await Test.deploy(signature);

  console.log("Address0: ", await signer0.getAddress());
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
