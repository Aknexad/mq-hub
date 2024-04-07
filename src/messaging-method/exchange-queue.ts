import { Channel, Options, Replies } from 'amqplib';
import { IExchangeQueue, DeclareExchangeInput } from '../types';

class ExchangeQueue implements IExchangeQueue {
  public async AssertExchange(
    input: DeclareExchangeInput
  ): Promise<Replies.AssertExchange> {
    const { channel, exchangeName, exchangeType, exchangeOptions } = input;

    const assertExchange = await channel.assertExchange(
      exchangeName,
      exchangeType,
      exchangeOptions
    );

    return assertExchange;
  }

  public async AssertQueue(
    channel: Channel,
    quemName: string,
    options?: Options.AssertQueue
  ): Promise<Replies.AssertQueue> {
    const assertQueue = await channel.assertQueue(quemName, options);
    return assertQueue;
  }

  public async BindingQueue(
    channel: Channel,
    assertQueue: Replies.AssertQueue,
    exchangeName: string,
    bindingKey: string,
    args?: any
  ): Promise<void> {
    await channel.bindQueue(assertQueue.queue, exchangeName, bindingKey, args);

    return;
  }
}

export { ExchangeQueue };
