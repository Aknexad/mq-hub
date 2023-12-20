import { Channel, Replies } from 'amqplib';

export type ExchangeOptions = {
  durable?: boolean;

  autoDelete?: boolean;

  internal?: boolean;

  arguments?: {
    [key: string]: any;
  };
};

export type DeclareExchangeInput = {
  channel: Channel;
  exchangeName: string;
  exchangeType: 'direct' | 'topic' | 'headers' | 'fanout' | '';
  exchangeOptions: ExchangeOptions;
};

export interface IExchangeQueue {
  AssertExchange(input: DeclareExchangeInput): Promise<Replies.AssertExchange>;
  AssertQueue(channel: Channel, quemName: string): Promise<Replies.AssertQueue>;

  BindingQueue(
    channel: Channel,
    assertQueue: Replies.AssertQueue,
    exchangeName: string,
    bindingKey: string
  ): Promise<void>;
}
