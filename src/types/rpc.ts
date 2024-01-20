import { Channel } from 'amqplib';

export type RpcObserverInput<T = any> = {
  channel: Channel;
  rpcQueueName: string;
  logic: T;
};

export type RocRequestInput<T = any> = {
  channel: Channel;
  rpcQueueName: string;
  requestPayload: T;
};

export interface IRpc {
  RocObserver(input: RpcObserverInput): Promise<void>;
  RpcRequest(input: RocRequestInput): Promise<void>;
}
