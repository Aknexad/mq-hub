import amqp from 'amqplib';

import { IPublisherConsumer, PublishInput, SubscribeInput } from '../types';

class PublishSubscribe implements IPublisherConsumer {
  constructor() {}

  async PublishMassage(data: PublishInput) {
    const { channel, exchange, bindingKey, massage } = data;

    try {
      channel.publish(
        exchange,
        bindingKey,
        Buffer.from(JSON.stringify(massage))
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async SubscribeMassage(data: SubscribeInput) {
    const { channel, exchange, bindingKey, subQName } = data;
    try {
      const queue = await channel.assertQueue(subQName);

      channel.bindQueue(queue.queue, exchange, bindingKey);

      channel.consume(queue.queue, data => {});
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { PublishSubscribe };
