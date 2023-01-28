async function main() {
  const Fundraisers = await ethers.getContractFactory("Fundraisers")
  const accounts = await ethers.getSigners()
  const fundraisers = await Fundraisers.deploy()
  await fundraisers.deployed()

  console.log(` Contract Deployed To: ${fundraisers.address}`)
  console.log(` Contract Owner Is: ${accounts[0].address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
