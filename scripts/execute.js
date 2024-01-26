// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// CREATE: hash(sender + nonce )
// CREATE2: hash(0xFF + sender + bytecode + salt )

const FACTORY_NONCE = 1;
const FACTORY_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const EP_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const PM_ADDRESS = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

async function main() {
  const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);

  const sender = hre.ethers.getCreateAddress({
    from: FACTORY_ADDRESS,
    nonce: FACTORY_NONCE,
  });

  const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");

  const [signer0, signer1] = await hre.ethers.getSigners();
  const address0 = await signer0.getAddress();

  const initCode = "0x";
  // FACTORY_ADDRESS +
  // AccountFactory.interface
  //   .encodeFunctionData("createAccount", [address0])
  //   .slice(2);

  //   await entryPoint.depositTo(PM_ADDRESS, {
  //     value: ethers.parseEther("100"),
  //   });

  console.log({ sender });

  const Account = await hre.ethers.getContractFactory("Account");
  const userOp = {
    sender,
    nonce: await entryPoint.getNonce(sender, 0),
    initCode,
    callData: Account.interface.encodeFunctionData("execute"),
    callGasLimit: 800_000,
    verificationGasLimit: 800_000,
    preVerificationGas: 400_000,
    maxFeePerGas: hre.ethers.parseUnits("10", "gwei"),
    maxPriorityFeePerGas: hre.ethers.parseUnits("5", "gwei"),
    paymasterAndData: PM_ADDRESS,
    signature: "0x",
  };

  const userOpHash = await entryPoint.getUserOpHash(userOp);
  userOp.signature = signer0.signMessage(hre.ethers.getBytes(userOpHash));

  const tx = await entryPoint.handleOps([userOp], address0);
  const receipt = await tx.wait();
  console.log(receipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
