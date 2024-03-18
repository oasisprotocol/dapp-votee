import { int, string } from 'hardhat/internal/core/params/argumentTypes'
import { task } from 'hardhat/config'
import { HttpNetworkUserConfig } from 'hardhat/types'
import { AbiCoder, JsonRpcProvider, parseEther, parseUnits, Wallet } from 'ethers'
import { PollManager__factory } from '../src/contracts'

interface CreateArgs {
  pollManagerContract: string
  aclNativeBalanceContract: string
  closeTimestamp: number
}

/**
 * Example usage:
 * npx hardhat create --network sapphire-testnet --poll-manager-contract 0xdAB5845136b3102E63023BB2A2405cb71608605d --acl-native-balance-contract 0x8e29375FE5Db7eBb1b5eF24B7D397bBF0B01De09
 */
task('create', 'Create proposal')
  .addParam<string>('pollManagerContract', 'Poll manager contract address', undefined, string, false)
  .addParam<string>(
    'aclNativeBalanceContract',
    'Native balance ACL contract address',
    undefined,
    string,
    false
  )
  .addParam<number>('closeTimestamp', 'Close timestamp of the poll(unix format)', 0, int)
  .setAction(async (args: CreateArgs, hre) => {
    const { pollManagerContract, aclNativeBalanceContract, closeTimestamp } = args

    const currentNetwork = Object.values(hre.config.networks).find(
      x => x.chainId === hre.network.config.chainId
    ) as HttpNetworkUserConfig

    const { accounts, url } = currentNetwork
    const provider = new JsonRpcProvider(url)
    const [account] = accounts as string[]
    const wallet = new Wallet(account, provider)

    const pollManager = PollManager__factory.connect(pollManagerContract, wallet)

    const unsignedTx = await pollManager.create.populateTransaction(
      {
        ipfsHash: new Uint8Array([]),
        numChoices: 3,
        closeTimestamp,
        acl: aclNativeBalanceContract,
      },
      AbiCoder.defaultAbiCoder().encode(['uint256'], [parseEther('100')])
    )
    unsignedTx.gasLimit = 500000n
    unsignedTx.gasPrice = parseUnits('110', 'gwei')
    unsignedTx.value = 0n

    console.dir(unsignedTx)

    const tx = await wallet.sendTransaction(unsignedTx)
    const receipt = await tx.wait()

    const proposalCreatedFilter = pollManager.filters.ProposalCreated()
    const events = await pollManager.queryFilter(proposalCreatedFilter, receipt!.blockNumber)
    const [
      {
        args: [hash],
      },
    ] = events

    console.log(`Created proposal with ID: "${hash}"`)
  })
