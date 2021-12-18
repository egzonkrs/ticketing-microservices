import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS Client before connecting');
    }
    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        // this func will be invoked once NATS succesfully connects to our NATS Server
        console.log('Connected to NATS');
        resolve();
      });
      this.client.on('error', (err) => {
        console.error(err, '[nats-wrapper nats-test 23]');
        reject(err);
      })
    });
  }
};

export const natsWrapper = new NatsWrapper();