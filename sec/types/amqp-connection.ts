import { Channel } from 'amqplib';

export type CrateChannelInput = {
  exchangeName: string;
  exchangeType: string;
  option: {
    durable: boolean;
  };
};

export interface IAmqpConnection {
  CrateChannel(input: CrateChannelInput): Promise<Channel>;
}
