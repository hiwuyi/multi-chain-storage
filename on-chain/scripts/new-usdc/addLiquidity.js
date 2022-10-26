const { ethers } = require('hardhat')

const overrides = {
  gasLimit: 9999999,
}

async function main() {
  const deployer = await ethers.getSigner()
  console.log('deployer: ', deployer.address)

  const Router = await ethers.getContractFactory('UniswapV2Router01')
  const router = Router.attach('0xd5328354c83BA6bCe97CD24b444b070Dd00AB1cf')

  const USDC = await ethers.getContractFactory('USDCoin')
  const usdc = USDC.attach('0xE097d6B3100777DC31B34dC2c58fB524C2e76921')

  const ERC20 = await ethers.getContractFactory('TestERC20')
  const renFil = ERC20.attach('0xF18d1F8dB0F423E3d2121072c7908a6503331191')

  const UNIX_NOW = Math.floor(Date.now() / 1000)
  const tx = await router.addLiquidity(
    usdc.address,
    renFil.address,
    ethers.utils.parseUnits('5000', 6),
    ethers.utils.parseEther('1000'),
    ethers.utils.parseUnits('5000', 6),
    ethers.utils.parseEther('1000'),
    deployer.address,
    UNIX_NOW + 60 * 60 * 24 * 3, // deadline = 3 days from now
  )
  await tx.wait()
  console.log(tx.hash)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
