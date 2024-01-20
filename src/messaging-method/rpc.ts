import { Channel, ConsumeMessage } from 'amqplib';
import { v4 as uuid4 } from 'uuid';

import { RpcObserverInput, RocRequestInput, IRpc } from '../types';

class Rpc implements IRpc {
  public async RocObserver(input: RpcObserverInput<any>): Promise<void> {
    try {
      const { channel, rpcQueueName, logic } = input;

      await channel.assertQueue(rpcQueueName, { durable: false });

      channel.prefetch(1);

      const prosesDate = async (msg: ConsumeMessage | null) => {
        if (!msg?.content) return;

        console.log('request reive');

        const payload = JSON.parse(msg.content.toString());

        const response = await logic(payload);

        channel.sendToQueue(
          msg.properties.replyTo,
          Buffer.from(JSON.stringify(response)),
          {
            correlationId: msg.properties.correlationId,
          }
        );

        channel.ack(msg);

        channel.consume(rpcQueueName, prosesDate, { noAck: false });
      };
    } catch (error) {
      console.log(`RocObserver error => ${error}`);
      throw error;
    }
  }

  public async RpcRequest(input: RocRequestInput<any>): Promise<any> {
    try {
      const { channel, rpcQueueName, requestPayload } = input;

      const uuid = uuid4(); // correlationId
      return await this.RequestData(channel, rpcQueueName, requestPayload, uuid);
    } catch (error) {
      console.log(`RpcRequest error => ${error}`);
      throw error;
    }
  }

  private async RequestData(
    channel: Channel,
    rpcQueueName: string,
    requestPayload: any,
    uuid: string
  ) {
    try {
      const q = await channel.assertQueue('', { exclusive: true });

      channel.sendToQueue(rpcQueueName, Buffer.from(JSON.stringify(requestPayload)), {
        replyTo: q.queue,
        correlationId: uuid,
      });

      return new Promise((resolve, reject) => {
        // timeout n
        const timeout = setTimeout(() => {
          channel.close();
          resolve('API could not fullfil the request!');
        }, 8000);
        channel.consume(
          q.queue,
          (msg: any) => {
            if (msg.properties.correlationId == uuid) {
              resolve(JSON.parse(msg.content.toString()));
              clearTimeout(timeout);
            } else {
              reject('data Not found!');
            }
          },
          {
            noAck: true,
          }
        );
      });
    } catch (error) {
      console.log(`RequestData error => ${error}`);
      throw error;
    }
  }
}

export { Rpc };
