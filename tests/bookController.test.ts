import express, { Request, Response } from 'express';
import { getBooks } from '../controllers/bookController';
import http from 'http';
import { AddressInfo } from 'net';

const app = express();
app.get('/books', getBooks);

describe('GET /books (without supertest)', () => {
  let server: http.Server;
  let port: number;
  let host: string;

  // Set up a server before running the tests
  beforeAll((done) => {
    server = app.listen(0, () => { // Listen on a random available port
      const addr = server.address() as AddressInfo;
      port = addr.port;
      host = 'localhost'; // Or '127.0.0.1'
      done();
    });
  });

  // Close the server after the tests are finished
  afterAll((done) => {
    server.close(done);
  });

  it('should return an array of books', (done) => {
    const options = {
      hostname: host,
      port: port,
      path: '/books',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        expect(res.statusCode).toBe(200);
        try {
          const body = JSON.parse(data);
          expect(Array.isArray(body)).toBe(true);
          done(); // Call done() to signal the end of the async test
        } catch (error) {
          done(error); // Pass any error to done()
        }
      });
    });

    req.on('error', (error) => {
      done(error); // Pass any error to done()
    });
    req.end(); // Send the request
  });
});
