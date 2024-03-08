import { task } from 'hardhat/config';
import { existsSync, promises as fs } from 'fs';
import { HardhatRuntimeEnvironment, HttpNetworkUserConfig } from 'hardhat/types';
import { AbiCoder, BytesLike, EventLog, parseEther } from 'ethers';

function maketee(filename?:string) {
  return async function tee(line?:string) {
    if( line !== undefined ) {
      console.log(line);
      if( filename ) {
        await fs.appendFile(filename, line + "\n");
      }
    }
  }
}


interface DeployArgs {
    viteenv: string | undefined;
}


async function deploy_acls(hre:HardhatRuntimeEnvironment, tee:ReturnType<typeof maketee>)
{
  // Deploy AllowAllACL
  const factory_AllowAllACL = await hre.ethers.getContractFactory('AllowAllACL');
  const contract_AllowAllACL = await factory_AllowAllACL.deploy();
  await tee('');
  await tee(`# AllowAllACL tx ${contract_AllowAllACL.deploymentTransaction()?.hash}`);
  await contract_AllowAllACL.waitForDeployment();
  const addr_AllowAllACL = await contract_AllowAllACL.getAddress();
  await tee(`VITE_CONTRACT_ACL_ALLOWALL=${addr_AllowAllACL}`);

  // Deploy NativeBalanceACL
  const factory_NativeBalanceACL = await hre.ethers.getContractFactory('NativeBalanceACL');
  const contract_NativeBalanceACL = await factory_NativeBalanceACL.deploy();
  await tee('');
  await tee(`# NativeBalanceACL tx ${contract_AllowAllACL.deploymentTransaction()?.hash}`);
  await contract_NativeBalanceACL.waitForDeployment();
  const addr_NativeBalanceACL = await contract_NativeBalanceACL.getAddress();
  await tee(`VITE_CONTRACT_ACL_NATIVEBALANCE=${addr_NativeBalanceACL}`);

  return { addr_AllowAllACL, addr_NativeBalanceACL };
}


// Default DAO deployment, no permissions.
task('deploy')
  .addParam('viteenv', 'Output contract addresses to environment file', '')
  .setAction(async (args:DeployArgs, hre) => {
    await hre.run('compile', {quiet:true});

    if( args.viteenv ) {
      console.log(`# Saving environment to ${args.viteenv}`);
      if( existsSync(args.viteenv) )
      {
        await fs.unlink(args.viteenv);
      }
    }

    const tee = maketee(args.viteenv);

    // Export RPC info etc. from current hardhat config
    const currentNetwork = Object.values(hre.config.networks).find((x) => x.chainId === hre.network.config.chainId);
    const currentNetworkUrl = (currentNetwork! as HttpNetworkUserConfig).url;
    tee(`VITE_NETWORK=${hre.network.config.chainId}`);
    if( ! currentNetworkUrl ) {
      tee('VITE_WEB3_GATEWAY=http://localhost:8545');
    }
    else {
      tee(`VITE_WEB3_GATEWAY=${currentNetworkUrl}`);
    }

    const { addr_AllowAllACL, addr_NativeBalanceACL } = await deploy_acls(hre, tee);

    // Deploy PollManager
    const factory_PollManager = await hre.ethers.getContractFactory('PollManager');
    const contract_PollManager = await factory_PollManager.deploy(addr_AllowAllACL);
    await tee('');
    await tee(`# PollManager tx ${contract_PollManager.deploymentTransaction()?.hash}`);
    await contract_PollManager.waitForDeployment();
    await tee(`VITE_CONTRACT_POLLMANAGER=${await contract_PollManager.getAddress()}`);

    // Set the default PollManager ACL, so frontend doesn't have to query contract
    await tee('');
    await tee('# IPollManagerACL used by PollManager');
    await tee(`VITE_CONTRACT_POLLMANAGER_ACL=${addr_AllowAllACL}`);

    // Create a poll with 3 options
    const tx = await contract_PollManager.create({
      ipfsHash: new Uint8Array([]),
      numChoices: 3,
      closeTimestamp: 0,
      acl: addr_NativeBalanceACL,
    }, AbiCoder.defaultAbiCoder().encode(['uint256'], [parseEther('100')]));

    const receipt = await tx.wait();
    const createEvent = receipt!.logs.find(event => (event as EventLog).fragment.name === 'ProposalCreated') as EventLog;
    const proposalId = createEvent!.args![0] as BytesLike;

    await tee('');
    await tee('# Proposal ID for poll pre-created poll')
    await tee(`VITE_PROPOSAL_ID=${proposalId}`);
  });
