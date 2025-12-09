#!/usr/bin/env node

import http from "http";
import dotenv from "dotenv";
import app from "../app"; // note the .js extension for ESM
import { initWebSocket } from '../utils/ws'
dotenv.config();

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
initWebSocket(server);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val: string | number) {
  const port = parseInt(val as string, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

function onError(error: any) {
  if (error.syscall !== "listen") throw error;
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  console.log(`🚀 Server listening on ${bind}`);
}
