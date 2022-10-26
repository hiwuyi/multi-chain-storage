async function main() {
  const deployer = await ethers.getSigner()

  const USDC = await ethers.getContractFactory('USDC')
  const usdc = await USDC.deploy()
  await usdc.deployed()

  console.log('deployer: ', deployer.address)
  console.log(`usdc address: ${usdc.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
