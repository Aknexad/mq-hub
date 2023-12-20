import { Channel, Options } from 'amqplib';

class AssertingAndBinding {
  constructor() {}

  public async assertExchange(
    channel: Channel | null,
    exchangeName: string,
    exchangeType: string,
    options: Options.AssertExchange
  ) {
    if (!channel) {
      throw new Error('Channel is not defined');
    }

    await channel.assertExchange(exchangeName, exchangeType, options);
    return;
  }

  public async assertQueue(
    channel: Channel | null,
    queueName: string,
    options: Options.AssertQueue
  ) {
    if (!channel) {
      throw new Error('Channel is not defined');
    }

    await channel.assertQueue(queueName, options);
    return;
  }

  public async bindQueueToExchange(
    channel: Channel | null,
    queueName: string,
    sourceName: string,
    routingKey: string
  ) {
    if (!channel) {
      throw new Error('Channel is not defined');
    }

    await channel.bindQueue(queueName, sourceName, routingKey);
    return;
  }

  public async bindExchangeToExchange(
    channel: Channel,
    sourceExchange: string,
    destinationExchange: string,
    routingKey: string
  ) {
    if (!channel) {
      throw new Error('Channel is not defined');
    }

    await channel.bindExchange(sourceExchange, destinationExchange, routingKey);
    return;
  }
}

export default AssertingAndBinding;
