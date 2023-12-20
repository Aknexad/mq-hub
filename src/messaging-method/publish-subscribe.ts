import amqp from 'amqplib';

import { IPublisherConsumer, PublishInput, SubscribeInput } from '../types';

class PublishSubscribe implements IPublisherConsumer {
  public async PublishMassage(data: PublishInput): Promise<void> {
    const { channel, exchangeName, bindingKey, massage, options } = data;

    const payload = Buffer.from(JSON.stringify(massage));

    channel.publish(exchangeName, bindingKey, payload, options);

    return;
  }

  public async SubscribeMassage(data: SubscribeInput): Promise<void> {
    const { channel, quemName, logic } = data;

    channel.consume(quemName, async (data: amqp.ConsumeMessage | null) => {
      if (!data) {
        return;
      }
      const payload = JSON.parse(data.content.toString());

      const prosesData = await logic(payload);

      if (!prosesData) {
        return;
      }

      channel.ack(data);
    });

    return;
  }
}

export { PublishSubscribe };
