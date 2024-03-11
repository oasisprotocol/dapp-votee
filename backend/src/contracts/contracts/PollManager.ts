/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from 'ethers'
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from '../common'

export declare namespace PollManager {
  export type ProposalParamsStruct = {
    ipfsHash: BytesLike
    numChoices: BigNumberish
    closeTimestamp: BigNumberish
    acl: AddressLike
  }

  export type ProposalParamsStructOutput = [
    ipfsHash: string,
    numChoices: bigint,
    closeTimestamp: bigint,
    acl: string,
  ] & {
    ipfsHash: string
    numChoices: bigint
    closeTimestamp: bigint
    acl: string
  }
}

export interface PollManagerInterface extends Interface {
  getFunction(
    nameOrSignature:
      | 'MAX_CHOICES'
      | 'PAST_PROPOSALS'
      | 'PROPOSALS'
      | 'ballotIsActive'
      | 'canVoteOnPoll'
      | 'close'
      | 'create'
      | 'getACL'
      | 'getPollACL'
      | 'getVoteCounts'
      | 'supportsInterface'
      | 'vote'
  ): FunctionFragment

  getEvent(nameOrSignatureOrTopic: 'ProposalClosed' | 'ProposalCreated'): EventFragment

  encodeFunctionData(functionFragment: 'MAX_CHOICES', values?: undefined): string
  encodeFunctionData(functionFragment: 'PAST_PROPOSALS', values: [BigNumberish]): string
  encodeFunctionData(functionFragment: 'PROPOSALS', values: [BytesLike]): string
  encodeFunctionData(functionFragment: 'ballotIsActive', values: [BytesLike]): string
  encodeFunctionData(functionFragment: 'canVoteOnPoll', values: [BytesLike, AddressLike, BytesLike]): string
  encodeFunctionData(functionFragment: 'close', values: [BytesLike]): string
  encodeFunctionData(
    functionFragment: 'create',
    values: [PollManager.ProposalParamsStruct, BytesLike]
  ): string
  encodeFunctionData(functionFragment: 'getACL', values?: undefined): string
  encodeFunctionData(functionFragment: 'getPollACL', values: [BytesLike]): string
  encodeFunctionData(functionFragment: 'getVoteCounts', values: [BytesLike]): string
  encodeFunctionData(functionFragment: 'supportsInterface', values: [BytesLike]): string
  encodeFunctionData(functionFragment: 'vote', values: [BytesLike, BigNumberish, BytesLike]): string

  decodeFunctionResult(functionFragment: 'MAX_CHOICES', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'PAST_PROPOSALS', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'PROPOSALS', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'ballotIsActive', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'canVoteOnPoll', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'close', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'create', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getACL', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getPollACL', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getVoteCounts', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'supportsInterface', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'vote', data: BytesLike): Result
}

export namespace ProposalClosedEvent {
  export type InputTuple = [id: BytesLike, topChoice: BigNumberish]
  export type OutputTuple = [id: string, topChoice: bigint]
  export interface OutputObject {
    id: string
    topChoice: bigint
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace ProposalCreatedEvent {
  export type InputTuple = [id: BytesLike]
  export type OutputTuple = [id: string]
  export interface OutputObject {
    id: string
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export interface PollManager extends BaseContract {
  connect(runner?: ContractRunner | null): PollManager
  waitForDeployment(): Promise<this>

  interface: PollManagerInterface

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>

  on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>

  once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>

  listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>
  listeners(eventName?: string): Promise<Array<Listener>>
  removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>

  MAX_CHOICES: TypedContractMethod<[], [bigint], 'view'>

  PAST_PROPOSALS: TypedContractMethod<[arg0: BigNumberish], [string], 'view'>

  PROPOSALS: TypedContractMethod<
    [arg0: BytesLike],
    [
      [boolean, bigint, PollManager.ProposalParamsStructOutput] & {
        active: boolean
        topChoice: bigint
        params: PollManager.ProposalParamsStructOutput
      },
    ],
    'view'
  >

  ballotIsActive: TypedContractMethod<[in_id: BytesLike], [boolean], 'view'>

  canVoteOnPoll: TypedContractMethod<
    [in_proposalId: BytesLike, in_voter: AddressLike, in_data: BytesLike],
    [bigint],
    'view'
  >

  close: TypedContractMethod<[in_proposalId: BytesLike], [void], 'nonpayable'>

  create: TypedContractMethod<
    [in_params: PollManager.ProposalParamsStruct, in_aclData: BytesLike],
    [string],
    'nonpayable'
  >

  getACL: TypedContractMethod<[], [string], 'view'>

  getPollACL: TypedContractMethod<[proposalId: BytesLike], [string], 'view'>

  getVoteCounts: TypedContractMethod<[in_proposalId: BytesLike], [bigint[]], 'view'>

  supportsInterface: TypedContractMethod<[interfaceId: BytesLike], [boolean], 'view'>

  vote: TypedContractMethod<
    [in_proposalId: BytesLike, in_choiceId: BigNumberish, in_data: BytesLike],
    [void],
    'nonpayable'
  >

  getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T

  getFunction(nameOrSignature: 'MAX_CHOICES'): TypedContractMethod<[], [bigint], 'view'>
  getFunction(nameOrSignature: 'PAST_PROPOSALS'): TypedContractMethod<[arg0: BigNumberish], [string], 'view'>
  getFunction(nameOrSignature: 'PROPOSALS'): TypedContractMethod<
    [arg0: BytesLike],
    [
      [boolean, bigint, PollManager.ProposalParamsStructOutput] & {
        active: boolean
        topChoice: bigint
        params: PollManager.ProposalParamsStructOutput
      },
    ],
    'view'
  >
  getFunction(nameOrSignature: 'ballotIsActive'): TypedContractMethod<[in_id: BytesLike], [boolean], 'view'>
  getFunction(
    nameOrSignature: 'canVoteOnPoll'
  ): TypedContractMethod<
    [in_proposalId: BytesLike, in_voter: AddressLike, in_data: BytesLike],
    [bigint],
    'view'
  >
  getFunction(nameOrSignature: 'close'): TypedContractMethod<[in_proposalId: BytesLike], [void], 'nonpayable'>
  getFunction(
    nameOrSignature: 'create'
  ): TypedContractMethod<
    [in_params: PollManager.ProposalParamsStruct, in_aclData: BytesLike],
    [string],
    'nonpayable'
  >
  getFunction(nameOrSignature: 'getACL'): TypedContractMethod<[], [string], 'view'>
  getFunction(nameOrSignature: 'getPollACL'): TypedContractMethod<[proposalId: BytesLike], [string], 'view'>
  getFunction(
    nameOrSignature: 'getVoteCounts'
  ): TypedContractMethod<[in_proposalId: BytesLike], [bigint[]], 'view'>
  getFunction(
    nameOrSignature: 'supportsInterface'
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], 'view'>
  getFunction(
    nameOrSignature: 'vote'
  ): TypedContractMethod<
    [in_proposalId: BytesLike, in_choiceId: BigNumberish, in_data: BytesLike],
    [void],
    'nonpayable'
  >

  getEvent(
    key: 'ProposalClosed'
  ): TypedContractEvent<
    ProposalClosedEvent.InputTuple,
    ProposalClosedEvent.OutputTuple,
    ProposalClosedEvent.OutputObject
  >
  getEvent(
    key: 'ProposalCreated'
  ): TypedContractEvent<
    ProposalCreatedEvent.InputTuple,
    ProposalCreatedEvent.OutputTuple,
    ProposalCreatedEvent.OutputObject
  >

  filters: {
    'ProposalClosed(bytes32,uint256)': TypedContractEvent<
      ProposalClosedEvent.InputTuple,
      ProposalClosedEvent.OutputTuple,
      ProposalClosedEvent.OutputObject
    >
    ProposalClosed: TypedContractEvent<
      ProposalClosedEvent.InputTuple,
      ProposalClosedEvent.OutputTuple,
      ProposalClosedEvent.OutputObject
    >

    'ProposalCreated(bytes32)': TypedContractEvent<
      ProposalCreatedEvent.InputTuple,
      ProposalCreatedEvent.OutputTuple,
      ProposalCreatedEvent.OutputObject
    >
    ProposalCreated: TypedContractEvent<
      ProposalCreatedEvent.InputTuple,
      ProposalCreatedEvent.OutputTuple,
      ProposalCreatedEvent.OutputObject
    >
  }
}
