const { ethers } = require('hardhat')

const overrides = {
  gasLimit: 9999999,
}

async function main() {
  const deployer = await ethers.getSigner()
  const USDC_ADDRESS = '0xE097d6B3100777DC31B34dC2c58fB524C2e76921'
  const FILSWAN_ORACLE_ADDRESS = '0x6f83DA2C5f1C5AAC259aD8d817Bb92c2D863F74c'
  const PRICE_FEED_ADDRESS = '0x0D65a9d2ea6185a1Eeb95664D236cbAEc29A472B'
  const FILINK_ADDRESS = '0xef4828525f78991a2b7b1f108751948F16f25a3F'

  console.log('deployer: ', deployer.address)

  const SwanPayment = await ethers.getContractFactory('SwanPayment')

  //   function initialize(
  //     address owner,
  //     address ERC20_TOKEN,
  //     address oracle,
  //     address priceFeed,
  //     address chainlinkOracle
  // )
  const paymentContract = await upgrades.deployProxy(
    SwanPayment,
    [
      deployer.address,
      USDC_ADDRESS,
      FILSWAN_ORACLE_ADDRESS,
      PRICE_FEED_ADDRESS,
      FILINK_ADDRESS,
    ],
    overrides,
  )
  await paymentContract.deployed()
  console.log(`swan payment address: ${paymentContract.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
