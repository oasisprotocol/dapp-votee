import { expect } from "chai";
import { ethers } from "hardhat";
import { BytesLike, EventLog, ZeroHash } from "ethers";
import { PollManager, AllowAllACL } from "../src/contracts";

async function addProposal(dao:PollManager, proposal:PollManager.ProposalParamsStruct, aclData?:Uint8Array, value?:bigint) {
  if( ! value ) {
    value = 0n;
  }
  const tx = await dao.create(proposal, aclData ?? new Uint8Array([]), {value});
  const receipt = await tx.wait();
  expect(receipt!.logs).to.not.be.undefined;
  const createEvent = receipt!.logs.find(event => (event as EventLog).fragment.name === 'ProposalCreated') as EventLog;
  expect(createEvent).to.not.be.undefined;
  expect(createEvent!.args).to.not.be.undefined;
  return createEvent!.args![0] as BytesLike;
}

async function closeProposal(dao:PollManager, proposalId:BytesLike) {
  const tx = await dao.close(proposalId);
  const receipt = await tx.wait();
  expect(receipt!.logs).to.not.be.undefined;
  const closeEvent = receipt!.logs.find(event => (event as EventLog).fragment.name === 'ProposalClosed') as EventLog | undefined;
  expect(closeEvent).to.not.be.undefined;
  expect(closeEvent!.args).to.not.be.undefined;
  const [_, topChoice] = closeEvent!.args;
  return topChoice as bigint;
}

async function deployContract(name:string, ...args:any[])
{
  const c = await (await ethers.getContractFactory(name)).deploy(...args);
  await c.waitForDeployment();
  console.log('  -', name, await c.getAddress());
  return c;
}

describe("PollManager", function () {
  let acl_allowall : AllowAllACL;
  let pm : PollManager;
  let TEST_PROPOSALS: PollManager.ProposalParamsStruct[];

  before(async () => {
    acl_allowall = await deployContract('AllowAllACL') as AllowAllACL;

    const acl_allowall_addr = await acl_allowall.getAddress();
    pm = await deployContract(
      'PollManager',
      acl_allowall_addr
    ) as PollManager;

    TEST_PROPOSALS = [
      {ipfsHash: "0xabcd", ipfsSecret: ZeroHash, numChoices: 3n, publishVotes: true, closeTimestamp: 0n, acl: acl_allowall_addr},
      {ipfsHash: "0xdef0", ipfsSecret: ZeroHash, numChoices: 3n, publishVotes: true, closeTimestamp: 0n, acl: acl_allowall_addr},
    ]
  });

  it("Proposals and pagination", async function () {
    const ap_before = await pm.getActiveProposals(0, 0);
    const pp_before = await pm.getPastProposals(0, 0);
    expect(pp_before.out_proposals.length).eq(0);
    expect(ap_before.out_proposals.length).eq(0);

    for (const p of TEST_PROPOSALS) {
      await addProposal(pm, p);
    }

    const ap_after = await pm.getActiveProposals(0, TEST_PROPOSALS.length);
    const pp_after = await pm.getPastProposals(0, 0);

    expect(pp_after.out_count).eq(pp_before.out_count);
    expect(ap_after.out_count).eq(ap_before.out_count + BigInt(TEST_PROPOSALS.length));

    // Verify active proposals are listed in reverse order
    // This also verifies pagination works correctly
    for( let i = 0; i < TEST_PROPOSALS.length; i++ ) {
      const p = TEST_PROPOSALS[TEST_PROPOSALS.length - 1 - i];
      const ap_paginated = await pm.getActiveProposals(i, 1);
      expect(ap_paginated.out_proposals.length).eq(1);

      const x = ap_paginated.out_proposals[0].proposal.params;
      expect(x.ipfsHash).eq(p.ipfsHash);
      expect(x.numChoices).eq(p.numChoices);
      expect(x.publishVotes).eq(p.publishVotes);
      expect(x.closeTimestamp).eq(p.closeTimestamp);
      expect(x.acl).eq(p.acl);
    }

    // Then verify that when we close proposals
    // They get added to the top of the 'past proposals' list
  });
});
