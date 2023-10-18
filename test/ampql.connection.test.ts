import { AmqpConnection } from '../src';

describe('testing amqp connection ', () => {
  it('should successfully create a channel with the given exchange name, type, and options', async () => {
    // Arrange
    const data = {
      exchangeName: 'testExchange',
      exchangeType: 'direct',
      option: {
        durable: true,
      },
    };

    const channelMock = {
      assertExchange: jest.fn(),
    };

    const getChannelMock = jest
      .spyOn(AmqpConnection.prototype, 'GetChannel')
      // @ts-ignore
      .mockResolvedValue(channelMock);

    const amqpConnection = new AmqpConnection(null, 'amqp://localhost');

    // Act
    const result = await amqpConnection.CreateChannel(data);

    // Assert
    expect(getChannelMock).toHaveBeenCalled();
    expect(channelMock.assertExchange).toHaveBeenCalledWith(
      'testExchange',
      'direct',
      { durable: true }
    );
    expect(result).toBe(channelMock);
  });

  it('should return the created channel object', async () => {
    // Arrange
    const data = {
      exchangeName: 'testExchange',
      exchangeType: 'direct',
      option: {
        durable: true,
      },
    };

    const channelMock = {
      assertExchange: jest.fn(),
    };

    const getChannelMock = jest
      .spyOn(AmqpConnection.prototype, 'GetChannel')
      // @ts-ignore
      .mockResolvedValue(channelMock);

    const amqpConnection = new AmqpConnection(null, 'amqp://localhost');

    // Act
    const result = await amqpConnection.CreateChannel(data);

    // Assert
    expect(getChannelMock).toHaveBeenCalled();
    expect(channelMock.assertExchange).toHaveBeenCalledWith(
      'testExchange',
      'direct',
      { durable: true }
    );
    expect(result).toBe(channelMock);
  });

  // it('should throw an error if the amqplib connection is not established', async () => {
  //   // Arrange
  //   const data = {
  //     exchangeName: 'testExchange',
  //     exchangeType: 'direct',
  //     option: {
  //       durable: true,
  //     },
  //   };

  //   const amqpConnection = new AmqpConnection(null, 'amqp://localhost');

  //   // Act and Assert
  //   await expect(amqpConnection.CreateChannel(data)).rejects.toThrow();
  // });

  // it('should throw an error if the exchange name is not provided', async () => {
  //   // Arrange
  //   const data = {
  //     exchangeName: '',
  //     exchangeType: 'direct',
  //     option: {
  //       durable: true,
  //     },
  //   };

  //   const amqpConnection = new AmqpConnection(null, 'amqp://localhost');

  //   // Act and Assert
  //   await expect(amqpConnection.CreateChannel(data)).rejects.toThrow();
  // });

  // it('should throw an error if the exchange type is not provided', async () => {
  //   // Arrange
  //   const data = {
  //     exchangeName: 'testExchange',
  //     exchangeType: '',
  //     option: {
  //       durable: true,
  //     },
  //   };

  //   const amqpConnection = new AmqpConnection(null, 'amqp://localhost');

  //   // Act and Assert
  //   await expect(amqpConnection.CreateChannel(data)).rejects.toThrow();
  // });
});
