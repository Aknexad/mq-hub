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
      console.log('error in connecting to rabbitmq => ' + error.message);
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
      console.log('error in creating channel => ' + error.message);
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

  public async ReconnectionToRabbitMq(rabbitMqUrl: string, maxRetries: number = 5) {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        // Code to connect to RabbitMQ server

        this.connectToRabbitMQ = await amqp.connect(rabbitMqUrl);

        console.log('Connected to RabbitMQ successfully!');
        break; // Break out of the loop if the connection is successful
      } catch (error) {
        if (error.code === 'ECONNREFUSED') {
          console.error('Connection to RabbitMQ refused. Retrying...');
          retries++;
          await new Promise(resolve => setTimeout(resolve, 5000)); // Delay before retrying
        } else {
          console.error('Unexpected error:', error.message);
          break; // Break out of the loop if an unexpected error occurs
        }
      }
    }
  }

  // public async ReconnectToRabbitMqOnErrors(rabbitMqUrl: string) {
  //   try {
  //     const connection = await this.AmqpConnections(rabbitMqUrl);

  //     // Event handler for when the connection is closed
  //     connection.on('close', err => {
  //       if (err) {
  //         console.error(`Connection closed with error: ${err}`);
  //       }
  //     });

  //     // Attempt to reconnect after a delay (e.g., 5 seconds)
  //     setTimeout(() => {
  //       console.log('Attempting to reconnect to RabbitMQ...');
  //       this.ReconnectToRabbitMqOnErrors(rabbitMqUrl);
  //     }, 5000);

  //     // Event handler for when an error occurs
  //     connection.on('error', err => {
  //       console.error(`Connection error: ${err}`);
  //     });

  //     // Do further setup, like creating a channel
  //     const channel = await this.CreateChannel(connection);
  //     return channel;

  //     console.log('Connected to RabbitMQ');
  //   } catch (error) {
  //     console.error(`Failed to connect to RabbitMQ: ${error}`);
  //     // Retry the connection after a delay (e.g., 5 seconds)
  //     setTimeout(() => {
  //       console.log('Retrying RabbitMQ connection...');
  //       this.ReconnectToRabbitMqOnErrors(rabbitMqUrl);
  //     }, 5000);
  //   }
  // }

  // public async RecreateChannel(connection: amqp.Connection) {
  //   try {
  //     let retries = 0;
  //     const maxRetries = 5; // Maximum number of retries
  //     while (retries < maxRetries) {
  //       try {
  //         this.channel = await this.CreateChannel(connection);

  //         console.log('Connected to RabbitMQ successfully!');

  //         break; // Break out of the loop if the connection is successful
  //       } catch (error) {
  //         console.error(`error => ${error}`);
  //         retries++;
  //       }
  //     }
  //   } catch (error) {
  //     console.log(`creating channel error => ${error}`);
  //     throw error;
  //   }
  // }

  public async ConnectionErrorHandler(connection: amqp.Connection, rabbitMqUrl: string) {
    let channel;

    connection.on('error', async err => {
      console.log('🚀 ~ AmqpConnection ~ ConnectionErrorHandler ~ err:', err);

      return await this.AmqpConnections(rabbitMqUrl);
    });

    return {
      connection,
      channel,
    };
  }
}

export { AmqpConnection };
