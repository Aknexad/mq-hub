import amqp, { Connection } from 'amqplib';

import { IAmqpConnection, CrateChannelInput } from '../types';

class AmqpConnection implements IAmqpConnection {
  constructor(
    private amqplibConnection: null | Connection = null,
    private amqpUrl: string
  ) {
    this.amqplibConnection = amqplibConnection;
    this.amqpUrl = amqpUrl;
  }

  private async GetChannel() {
    if (!this.amqplibConnection) {
      this.amqplibConnection = await amqp.connect(this.amqpUrl);
    }

    return await this.amqplibConnection.createChannel();
  }

  public async CrateChannel(data: CrateChannelInput) {
    try {
      const { exchangeName, exchangeType, option } = data;

      const channel = await this.GetChannel();
      await channel.assertExchange(exchangeName, exchangeType, option);
      return channel;
    } catch (error) {
      throw error;
    }
  }
}

export { AmqpConnection };
