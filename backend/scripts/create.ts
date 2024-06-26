import hre from 'hardhat'
import { AbiCoder } from 'ethers'
import { PollManager__factory } from '../src/contracts'
import { MIN_BALANCE } from '../constants'

async function main() {
  console.log('HARDHAT_NETWORK', process.env.HARDHAT_NETWORK)
  console.log('HARDHAT_POLL_MANAGER_CONTRACT', process.env.HARDHAT_POLL_MANAGER_CONTRACT)
  console.log('HARDHAT_ACL_NATIVE_BALANCE_CONTRACT', process.env.HARDHAT_ACL_NATIVE_BALANCE_CONTRACT)
  console.log('HARDHAT_CLOSE_TIMESTAMP', process.env.HARDHAT_CLOSE_TIMESTAMP)
  console.log('HARDHAT_MIN_BALANCE', process.env.HARDHAT_MIN_BALANCE)

  const pollManagerContract = process.env.HARDHAT_POLL_MANAGER_CONTRACT ?? ''
  if (!pollManagerContract) {
    throw new Error('[HARDHAT_POLL_MANAGER_CONTRACT] is required!')
  }

  const aclNativeBalanceContract = process.env.HARDHAT_ACL_NATIVE_BALANCE_CONTRACT ?? ''
  if (!aclNativeBalanceContract) {
    throw new Error('[HARDHAT_ACL_NATIVE_BALANCE_CONTRACT] is required!')
  }

  const closeTimestamp = BigInt(process.env.HARDHAT_CLOSE_TIMESTAMP ?? '0') ?? 0n
  const minBalance = BigInt(process.env.HARDHAT_MIN_BALANCE ?? '0') ?? 0n

  const [signer] = await hre.ethers.getSigners()

  const pollManager = PollManager__factory.connect(pollManagerContract, signer)

  const unsignedTx = await pollManager.create.populateTransaction(
    {
      ipfsHash: new Uint8Array([]),
      numChoices: 3,
      closeTimestamp,
      acl: aclNativeBalanceContract,
    },
    AbiCoder.defaultAbiCoder().encode(['uint256'], [minBalance !== 0n ? minBalance : MIN_BALANCE])
  )
  unsignedTx.gasLimit = 500000n
  unsignedTx.value = 0n

  const tx = await signer.sendTransaction(unsignedTx)
  const receipt = (await tx.wait())!

  const proposalCreatedFilter = pollManager.filters.ProposalCreated()
  const events = await pollManager.queryFilter(proposalCreatedFilter, receipt.blockNumber)
  const [{ args }] = events
  const [hash] = args

  console.log(
    '\x1b[32m',
    `
Created proposal with ID: "${hash}"
  
Update .env:
VITE_PROPOSAL_ID=${hash}
VITE_ACL_NATIVEBALANCE_MIN_BALANCE_WEI=${MIN_BALANCE}
  `
  )
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
