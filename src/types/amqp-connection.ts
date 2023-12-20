import { Channel, Connection } from 'amqplib';

export interface IAmqpConnection {
  AmqpConnections(rabbitMqUrl: string): Promise<Connection>;
  CreateChannel(AmqpConnection: Connection): Promise<Channel>;
}
