import { Channel, Replies, Options } from 'amqplib';

export type DeclareExchangeInput = {
  channel: Channel;
  exchangeName: string;
  exchangeType: 'direct' | 'topic' | 'headers' | 'fanout' | '';
  exchangeOptions: Options.AssertExchange;
};

export interface IExchangeQueue {
  AssertExchange(
    input: DeclareExchangeInput,
    options?: Options.AssertExchange
  ): Promise<Replies.AssertExchange>;

  AssertQueue(
    channel: Channel,
    quemName: string,
    options?: Options.AssertQueue
  ): Promise<Replies.AssertQueue>;

  BindingQueue(
    channel: Channel,
    assertQueue: Replies.AssertQueue,
    exchangeName: string,
    bindingKey: string
  ): Promise<void>;
}
