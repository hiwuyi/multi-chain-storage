const { ethers } = require('hardhat')

const overrides = {
  gasLimit: 9999999,
}

async function main() {
  const deployer = await ethers.getSigner()
  console.log('deployer: ', deployer.address)

  const Pair = await ethers.getContractFactory('UniswapV2Pair')
  const pair = Pair.attach('0xb9af7a5e5c2413fa18d8f89d3ee04e0898fd08fb')

  const ERC20 = await ethers.getContractFactory('TestERC20')
  const wFil = ERC20.attach('0xF18d1F8dB0F423E3d2121072c7908a6503331191')

  const USDC = await ethers.getContractFactory('USDCoin')
  const usdc = USDC.attach('0xE097d6B3100777DC31B34dC2c58fB524C2e76921')

  const mintFil = await wFil.mint(pair.address, ethers.utils.parseEther('1000'))
  const mintUsdc = await usdc.mint(
    pair.address,
    ethers.utils.parseUnits('5000', 6),
  )

  await mintFil.wait()
  await mintUsdc.wait()

  const tx = await pair.mint(deployer.address)
  await tx.wait()

  console.log(tx.hash)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
