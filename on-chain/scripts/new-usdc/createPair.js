const { ethers } = require('hardhat')

const overrides = {
  gasLimit: 9999999,
}

async function main() {
  const deployer = await ethers.getSigner()
  console.log('deployer: ', deployer.address)

  const USDC = await ethers.getContractFactory('USDCoin')
  const usdc = await USDC.deploy()
  await usdc.deployed()
  console.log(`usdc address: ${usdc.address}`)

  const ERC20 = await ethers.getContractFactory('TestERC20')
  const wFil = await ERC20.deploy('Wrapped Filecoin', 'wFIL')
  await wFil.deployed()
  console.log(`wFil address: ${wFil.address}`)

  const UniswapFactory = await ethers.getContractFactory('UniswapV2Factory')
  const factory = await UniswapFactory.deploy(deployer.address)
  await factory.deployed()
  console.log(`UniswapFactory address: ${factory.address}`)

  console.log('\ncreating pair...')
  const tx = await factory.createPair(wFil.address, usdc.address)
  const receipt = await tx.wait()
  console.log('create pair hash:', tx.hash)
  const pairAddress = receipt.events.find((e) => e.event == 'PairCreated').args
    .pair
  console.log('pair:', pairAddress)

  const mintTx1 = await wFil.mint(pairAddress, ethers.utils.parseEther('1000'))
  const mintTx2 = await usdc.mint(
    pairAddress,
    ethers.utils.parseUnits('5000', 6),
  )
  console.log('sending 1000 wFIL to pair:', mintTx1.hash)
  console.log('sending 1000 USDC to pair:', mintTx2.hash)

  const Pair = await ethers.getContractFactory('UniswapV2Pair')
  const pair = Pair.attach(pairAddress)

  console.log('\nadding liquidity...')
  const mintTx = await pair.mint(deployer.address)
  console.log(mintTx.hash)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
