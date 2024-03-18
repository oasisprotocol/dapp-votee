import { string } from 'hardhat/internal/core/params/argumentTypes'
import { task } from 'hardhat/config'
import { HttpNetworkUserConfig } from 'hardhat/types'
import { JsonRpcProvider, parseUnits, Wallet } from 'ethers'
import { PollManager__factory } from '../src/contracts'

interface CloseArgs {
  pollManagerContract: string
  proposalId: string
}

/**
 * Example usage:
 * npx hardhat close --network sapphire-testnet --poll-manager-contract 0xdAB5845136b3102E63023BB2A2405cb71608605d --proposal-id 0x91a86550e12752aac5353d3dae5f59867acb9058055bc9e9331db99f7e7f5627
 */
task('close', 'Close proposal')
  .addParam<string>('pollManagerContract', 'Poll manager contract address', undefined, string, false)
  .addParam<string>('proposalId', 'Id of proposal to close', undefined, string, false)
  .setAction(async (args: CloseArgs, hre) => {
    const { pollManagerContract, proposalId } = args

    const currentNetwork = Object.values(hre.config.networks).find(
      x => x.chainId === hre.network.config.chainId
    ) as HttpNetworkUserConfig

    const { accounts, url } = currentNetwork
    const provider = new JsonRpcProvider(url)
    const [account] = accounts as string[]
    const wallet = new Wallet(account, provider)

    const pollManager = PollManager__factory.connect(pollManagerContract, wallet)

    const unsignedTx = await pollManager.close.populateTransaction(proposalId)
    unsignedTx.gasLimit = 300000n
    unsignedTx.gasPrice = parseUnits('110', 'gwei')
    unsignedTx.value = 0n

    console.dir(unsignedTx)

    const tx = await wallet.sendTransaction(unsignedTx)
    const receipt = (await tx.wait())!

    const proposalClosedFilter = pollManager.filters.ProposalClosed()
    const events = await pollManager.queryFilter(proposalClosedFilter, receipt!.blockNumber)
    const [
      {
        args: [hash],
      },
    ] = events

    console.log(`Closed proposal with ID: "${hash}"`)
  })
