"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
require("dotenv/config");
const logger_1 = require("hono/logger");
const csrf_1 = require("hono/csrf");
const cors_1 = require("hono/cors");
const trailing_slash_1 = require("hono/trailing-slash");
const timeout_1 = require("hono/timeout");
const http_exception_1 = require("hono/http-exception");
const prometheus_1 = require("@hono/prometheus");
const hono_rate_limiter_1 = require("hono-rate-limiter");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = new hono_1.Hono();
app.use((0, cors_1.cors)({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
}));
const limiter = (0, hono_rate_limiter_1.rateLimiter)({
    windowMs: 1 * 60 * 1000,
    limit: 3,
    standardHeaders: "draft-6",
    keyGenerator: (c) => "<unique_key>"
});
const customTimeoutException = () => new http_exception_1.HTTPException(408, {
    message: `Request timeout`,
});
const { printMetrics, registerMetrics } = (0, prometheus_1.prometheus)();
// Inbuilt middlewares
app.use((0, logger_1.logger)()); // Logs request and response to the console
app.use((0, csrf_1.csrf)()); // Prevents CSRF attacks by checking request headers
app.use((0, trailing_slash_1.trimTrailingSlash)()); // Removes trailing slashes from the request URL
app.use('/', (0, timeout_1.timeout)(10000, customTimeoutException));
// Third-party middlewares
app.use('*', registerMetrics);
// Default route
app.get('/', (c) => {
    return c.html(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Property Management System</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
          }
          header {
            background-color: #007BFF;
            color: white;
            padding: 20px 0;
            text-align: center;
          }
          .container {
            max-width: 1200px;
            margin: 20px auto;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #fff;
          }
          h2 {
            color: #007BFF;
          }
          .btn {
            display: inline-block;
            padding: 10px 20px;
            margin: 10px 0;
            background-color: #007BFF;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 30px;
          }
          .btn a {
            text-decoration: none;
          }
          .btn:hover {
            background-color: #0056b3;
          }
          footer {
            text-align: center;
            padding: 20px 0;
            background-color: #007BFF;
            color: white;
            position: fixed;
            width: 100%;
            bottom: 0;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>Welcome to Digital Property system API</h1>
        </header>
        <div class="container">
          <h2>About</h2>
          <p>My API helps you access data of a property management system.</p>
          <h2>Feel free to view the information by clicking the button below</h2>
          <button class="btn"><a href="">Click here!</a></button>
        </div>
        <footer>
          <p>&copy; Digital Property API. All rights reserved.</p>
        </footer>
      </body>
      </html>
    `);
});
app.get('/ok', (c) => {
    console.log('hello');
    return c.text('The server is running!');
});
app.get('/timeout', async (c) => {
    await new Promise((resolve) => setTimeout(resolve, 11000));
    return c.text("Data after 5 seconds", 200);
});
app.get('/metrics', printMetrics);
app.use(limiter);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3000,
});
console.log(`Server is running on port ${process.env.PORT || 3000}`);
