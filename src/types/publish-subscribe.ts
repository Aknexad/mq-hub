import { Channel, Options } from 'amqplib';
import { ExchangeOptions } from '../types';

export type PublishInput = {
  channel: Channel;
  exchangeName: string;
  bindingKey: string;
  massage: any;
  options?: Options.Publish;
};

export type SubscribeInput<T = any> = {
  channel: Channel;
  quemName: string;
  logic: T;
  options?: Options.Consume;
};

export interface IPublisherConsumer {
  PublishMassage(data: PublishInput): Promise<void>;
  SubscribeMassage(data: SubscribeInput): Promise<void>;
}
