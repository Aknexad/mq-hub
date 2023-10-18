import { Channel } from 'amqplib';

export type CreateChannelInput = {
  exchangeName: string;
  exchangeType: string;
  option: {
    durable: boolean;
  };
};

export interface IAmqpConnection {
  CreateChannel(input: CreateChannelInput): Promise<Channel>;
}
