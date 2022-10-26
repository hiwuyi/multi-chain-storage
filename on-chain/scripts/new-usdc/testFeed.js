const { ethers } = require('hardhat')

const ONE_ETH = ethers.utils.parseEther('1')
const USDC_WFIL_PAIR = '0xb9af7a5e5c2413fa18d8f89d3ee04e0898fd08fb'

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log('deployer: ', deployer.address)

  const PriceFeed = await ethers.getContractFactory('PriceFeed')
  //const feed = await PriceFeed.deploy(USDC_WFIL_PAIR, 1, 6)
  const feed = PriceFeed.attach('0x0D65a9d2ea6185a1Eeb95664D236cbAEc29A472B')
  console.log('price feed address:', feed.address)

  const price = await feed.consult(USDC_WFIL_PAIR, ONE_ETH)

  console.log(
    ethers.utils.formatEther(ONE_ETH),
    'wFIL to USDC:',
    ethers.utils.formatEther(price),
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
