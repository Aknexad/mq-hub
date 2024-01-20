import amqp from 'amqplib';

import { IPublisherConsumer, PublishInput, SubscribeInput } from '../types';

class PublishSubscribe implements IPublisherConsumer {
  public async PublishMassage(data: PublishInput): Promise<void> {
    try {
      const { channel, exchangeName, bindingKey, massage, options } = data;

      if (!channel) {
        console.log(`channel is close reconnect to rabbitmq `);
      }

      const payload = Buffer.from(JSON.stringify(massage));

      channel.publish(exchangeName, bindingKey, payload, options);

      return;
    } catch (error) {
      console.error(`errors in publishing message =>  ${error.message}`);
      throw error;
    }
  }

  public async SubscribeMassage(data: SubscribeInput): Promise<void> {
    try {
      const { channel, quemName, logic } = data;

      if (!channel) {
        console.log(`channel is close reconnect to rabbitmq `);
      }

      channel.consume(quemName, async (data: amqp.Message | null) => {
        try {
          if (!data) {
            console.log(`data is null`);
            return;
          }
          const payload = JSON.parse(data.content.toString());

          const prosesData = await logic(payload);

          channel.ack(data);
        } catch (error) {
          console.error('errors in subscribing message => ' + error.message);
          channel.reject(data!, false); // Reject the message and re-queue it for later processing
          return; // Return early to prevent further processing of the message
        }
      });

      return;
    } catch (error) {
      console.error('errors in subscribing message => ' + error.message);
    }
  }
}

export { PublishSubscribe };
