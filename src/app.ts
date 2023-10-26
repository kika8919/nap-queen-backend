import http from "http";
import { createServer, PORT, HOST } from "./config/express";
import { AddressInfo } from "net";

const startServer = async () => {
  const app = createServer();

  const server = http
    .createServer(app)
    .listen({ host: HOST, port: PORT }, () => {
      const addressInfo = server.address() as AddressInfo;
      console.log(
        `Server running on port http://${addressInfo.address}:${addressInfo.port}`
      );
    });

  // Handle SIGINT signal for graceful server shutdown
  process.once("SIGINT", async () => {
    if (server) {
      server.close(() => {
        console.log("Server has been stopped.");
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });
};

startServer();
