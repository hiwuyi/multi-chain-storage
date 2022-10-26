async function main() {
  const deployer = await ethers.getSigner()

  const ERC20 = await ethers.getContractFactory('TestERC20WithRoles')
  const wFil = await ERC20.deploy('Wrapped Filecoin', 'wFIL')
  await wFil.deployed()

  console.log('deployer: ', deployer.address)
  console.log(`wFil address: ${wFil.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
