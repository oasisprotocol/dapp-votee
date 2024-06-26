import { expect } from 'chai'
import { ethers } from 'hardhat'
import { AbiCoder, BytesLike, EventLog, getBytes, parseEther } from 'ethers'
import { PollManager, AllowAllACL, NativeBalanceACL } from '../src/contracts'

async function addProposal(
  dao: PollManager,
  proposal: PollManager.ProposalParamsStruct,
  aclData?: Uint8Array
) {
  const tx = await dao.create(proposal, aclData ?? new Uint8Array([]))
  const receipt = await tx.wait()
  expect(receipt!.logs).to.not.be.undefined
  const createEvent = receipt!.logs.find(
    event => (event as EventLog).fragment.name === 'ProposalCreated'
  ) as EventLog
  expect(createEvent).to.not.be.undefined
  expect(createEvent!.args).to.not.be.undefined
  return createEvent!.args![0] as BytesLike
}

async function closeProposal(dao: PollManager, proposalId: BytesLike) {
  const tx = await dao.close(proposalId)
  const receipt = await tx.wait()
  expect(receipt!.logs).to.not.be.undefined
  const closeEvent = receipt!.logs.find(event => (event as EventLog).fragment.name === 'ProposalClosed') as
    | EventLog
    | undefined
  expect(closeEvent).to.not.be.undefined
  expect(closeEvent!.args).to.not.be.undefined
  const [, topChoice] = closeEvent!.args
  return topChoice as bigint
}

async function deployContract(name: string, ...args: unknown[]) {
  const c = await (await ethers.getContractFactory(name)).deploy(...args)
  await c.waitForDeployment()
  return c
}

describe('PollManager', function () {
  let acl_allowall: AllowAllACL
  let acl_nativebalance: NativeBalanceACL
  let pm: PollManager

  before(async () => {
    acl_allowall = (await deployContract('AllowAllACL')) as AllowAllACL
    acl_nativebalance = (await deployContract('NativeBalanceACL')) as NativeBalanceACL

    const acl_allowall_addr = await acl_allowall.getAddress()

    pm = (await deployContract('PollManager', acl_allowall_addr)) as PollManager
  })

  it('Proposals', async function () {
    const acl_nativebalance_addr = await acl_nativebalance.getAddress()

    const aclData = getBytes(AbiCoder.defaultAbiCoder().encode(['uint256'], [parseEther('1')]))

    const proposalId = await addProposal(
      pm,
      {
        ipfsHash: '0xdef0',
        numChoices: 3n,
        closeTimestamp: 0n,
        acl: acl_nativebalance_addr,
      },
      aclData
    )

    const voteTx = await pm.vote(proposalId, 1, new Uint8Array([]))
    await voteTx.wait()

    await closeProposal(pm, proposalId)

    const counts = await pm.getVoteCounts(proposalId)
    expect(counts[0]).eq(0n)
    expect(counts[1]).eq(1n)
    expect(counts[2]).eq(0n)
  })
})
