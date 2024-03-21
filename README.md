<a name="readme-top"></a>

<h1 align="center">Oasis voTEE</h1>

<div align="center">

[![CI build status][github-ci-build-badge]][github-ci-build-link]
[![CI lint status][github-ci-lint-badge]][github-ci-lint-link]

</div>

<!-- PROJECT BASIC INFORMATION -->
<br />
<p align="center">
    The Community Vote gives ROSE holders the power to choose the Oasis Network’s first mascot,
    a character that will appear in new communications from the Oasis Network.
    This project aligns with our mission to build a decentralized internet defined by privacy, security, and usability.
    <br />
    <a href="https://oasisprotocol.org/oasis-mascot-voting"><strong>Learn more »</strong></a>
    <br />
    <br />
    <a href="https://votee.oasis.io/">View voTEE dApp</a>
    ⟐
    <a href="https://github.com/oasisprotocol/dapp-votee/issues/new/choose">Report Bug</a>
    ⟐
    <a href="https://github.com/oasisprotocol/dapp-votee/issues/new/choose">Request Feature</a>
</p>

<!-- ABOUT THE PROJECT -->

## About The Project

[![voTEE dApp][votee-voting-screenshot]](https://votee.oasis.io/)

This project pertains to a voting campaign for the selection of a mascot for the Oasis Network. The campaign involves a
contract and a decentralized application (dApp) specifically designed to facilitate the voting process. This dApp
harnesses the power of [Oasis Sapphire ParaTime](https://docs.oasis.io/dapp/sapphire/) to enable confidential voting.

The poll, created by the contract, provides three mascots for participants to vote for. Each mascot symbolizes a
different aspect of the Oasis Network as follows:

- Capybara symbolizes _Interoperability_
- Desert Owl represents _Knowledge_
- Fennec Fox stands for _Privacy_

The voting process is open to all Sapphire wallets holding a minimum of 100 ROSE tokens. The vote commences on _March
20, 2024, at 4:00:00 PM GMT+1_ and concludes on _March 27, 2024, at 4:00:00 PM GMT+1_. At the closure of the vote, the
results will be promptly available and no further voting will be permitted.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This project depends on Node.js, therefore please confirm your system has it installed.

### Prerequisites

This project utilizes [pnpm](https://pnpm.io/installation#prerequisites) as its package manager.
We recommend using npm for a hassle-free installation of pnpm.

```sh
npm install -g @pnpm/exe
```

### Installation

This project is structured into two subprojects. The frontend dApp is found within the
'frontend' subdirectory, whereas the contract resides within the 'backend' subdirectory.

To install all necessary dependencies, execute the following command in the root of this project:

```sh
pnpm install
```

### Contract

Contracts are developed using [Hardhat](https://hardhat.org/docs). To ensure that the contract's confidentiality
features function correctly, it is necessary to deploy the contract to
the [Oasis Sapphire network](https://docs.oasis.io/dapp/sapphire/). The network may be a localnet, testnet, or mainnet.

To compile contracts in the Hardhat project, execute the following command inside 'backend' folder:

```sh
pnpm run build
```

The above step, is also required for frontend dApp development and build process.

#### Deployment Process

For the deployment of the contract, please execute the following command:

```sh
# Upon successful deployment of the contract, this script will automatically generate a poll.
npx hardhat deploy --network sapphire-testnet
```

Please confirm that the `PRIVATE_KEY` environment variable is set. This is because the Hardhat configuration defaults to
this variable. Failing to set the `PRIVATE_KEY` will result in the use of the default Hardhat node localnet private
key/s - it is strongly advised not to utilize those in a testnet or production environment.

#### Scripts

There are 2 scripts available for poll manipulation after the contract has been successfully deploy.

- create poll

```sh
# Example usage of create poll script
HARDHAT_NETWORK=sapphire-testnet \
HARDHAT_POLL_MANAGER_CONTRACT=0xdAB5845136b3102E63023BB2A2405cb71608605d \
HARDHAT_ACL_NATIVE_BALANCE_CONTRACT=0x8e29375FE5Db7eBb1b5eF24B7D397bBF0B01De09 \
npx hardhat run ./scripts/create.ts
```

- close poll

```sh
# Example usage of close poll script
HARDHAT_NETWORK=sapphire-testnet \
HARDHAT_POLL_MANAGER_CONTRACT=0xdAB5845136b3102E63023BB2A2405cb71608605d \
HARDHAT_PROPOSAL_ID=0x91a86550e12752aac5353d3dae5f59867acb9058055bc9e9331db99f7e7f5627 \
npx hardhat run ./scripts/close.ts
```

> [!IMPORTANT]  
> **The poll needs to be manually closed**, after the `closeTimestamp` condition has been met.

### Frontend

A prerequisite for running the frontend dApp entails executing the build command within
the 'backend' directory. Please verify that the 'abis', 'artifacts', and 'src' folders have been created. If these
folders are not generated, please refer back to the previous <a href="#contract">section</a> for guidance on how to
auto generate those folders.

To start a local server for the dApp, please execute the following command within the 'frontend' directory:

```sh
pnpm run dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the Apache 2.0 License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[github-ci-build-badge]: https://github.com/oasisprotocol/dapp-voting/actions/workflows/ci-build.yml/badge.svg
[github-ci-build-link]: https://github.com/oasisprotocol/dapp-voting/actions?query=workflow:ci-build+branch:master
[github-ci-lint-badge]: https://github.com/oasisprotocol/dapp-voting/actions/workflows/ci-lint.yml/badge.svg
[github-ci-lint-link]: https://github.com/oasisprotocol/dapp-voting/actions?query=workflow:ci-lint+branch:master
[votee-voting-screenshot]: ./images/votee-voting-screenshot.jpeg
