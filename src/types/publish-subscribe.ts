import { Channel } from 'amqplib';

export type PublishInput = {
  channel: Channel;
  exchange: string;
  bindingKey: string;
  massage: any;
};

export type SubscribeInput = {
  channel: Channel;
  exchange: string;
  bindingKey: string;
  subQName: string;
};

export interface IPublisherConsumer {
  PublishMassage(data: PublishInput): Promise<void>;
  SubscribeMassage(data: SubscribeInput): Promise<void>;
}
