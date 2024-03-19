import hre from 'hardhat'
import { PollManager__factory } from '../src/contracts'

async function main() {
  console.log('HARDHAT_NETWORK', process.env.HARDHAT_NETWORK)
  console.log('HARDHAT_POLL_MANAGER_CONTRACT', process.env.HARDHAT_POLL_MANAGER_CONTRACT)
  console.log('HARDHAT_PROPOSAL_ID', process.env.HARDHAT_PROPOSAL_ID)

  const pollManagerContract = process.env.HARDHAT_POLL_MANAGER_CONTRACT ?? ''
  if (!pollManagerContract) {
    throw new Error('[HARDHAT_POLL_MANAGER_CONTRACT] is required!')
  }

  const proposalId = process.env.HARDHAT_PROPOSAL_ID ?? ''
  if (!proposalId) {
    throw new Error('[HARDHAT_PROPOSAL_ID] is required!')
  }

  const [signer] = await hre.ethers.getSigners()

  const pollManager = PollManager__factory.connect(pollManagerContract, signer)

  const unsignedTx = await pollManager.close.populateTransaction(proposalId)
  unsignedTx.gasLimit = 300000n
  unsignedTx.value = 0n

  const tx = await signer.sendTransaction(unsignedTx)
  const receipt = (await tx.wait())!

  const proposalClosedFilter = pollManager.filters.ProposalClosed()
  const events = await pollManager.queryFilter(proposalClosedFilter, receipt.blockNumber)
  const [{ args }] = events
  const [hash] = args

  console.log(`Closed proposal with ID: "${hash}"`)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
