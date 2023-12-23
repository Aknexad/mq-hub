import amqp, { Connection } from 'amqplib';

import { IAmqpConnection } from '../types';

class AmqpConnection implements IAmqpConnection {
  private connectToRabbitMQ: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;
  public async AmqpConnections(rabbitMqUrl: string): Promise<amqp.Connection> {
    try {
      this.connectToRabbitMQ = await amqp.connect(rabbitMqUrl);

      return this.connectToRabbitMQ;
    } catch (error) {
      throw error;
    }
  }

  public async CreateChannel(
    connection: amqp.Connection,
    prefetchCount: number = 1
  ): Promise<amqp.Channel> {
    try {
      this.channel = await connection.createChannel();
      this.channel.prefetch(prefetchCount);
      return this.channel;
    } catch (error) {
      throw error;
    }
  }

  public async CloseConnection() {
    try {
      if (this.connectToRabbitMQ) {
        await this.connectToRabbitMQ.close();
      }
    } catch (error) {
      throw error;
    }
  }

  public async CLoseChannel() {
    try {
      if (this.channel) {
        await this.channel.close();
      }
    } catch (error) {
      throw error;
    }
  }
}

export { AmqpConnection };
