// RedisClient class
<<<<<<< HEAD
const { createClient } = require('redis');
// import { createClient } from 'redis';
=======
const redis = require('redis');

const { createClient } = redis;
>>>>>>> c7595248997f2f23db2d0904a3a5cba60516faff

// Create a redis class
class RedisClient {
  constructor() {
    this.client = createClient();
    this.connected = true;
    this.client.on('error', (err) => {
      this.connected = false;
      console.log(err);
    });
  }

  // isAlive method to confirm the connection status
  isAlive() {
    return this.connected;
  }

  // Asynchronous get method
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) reject(err);
        resolve(value);
      });
    });
  }

  // Asynchronous set method
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  // Asynchronous del method
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }
}

// Create a new instance of the RedisClient class
const redisClient = new RedisClient();

// Export the redisClient instance
module.exports = redisClient;
