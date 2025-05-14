"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
app.get('/books', bookController_1.getBooks);
describe('GET /books (without supertest)', () => {
    let server;
    let port;
    let host;
    // Set up a server before running the tests
    beforeAll((done) => {
        server = app.listen(0, () => {
            const addr = server.address();
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
        const req = http_1.default.request(options, (res) => {
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
                }
                catch (error) {
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
