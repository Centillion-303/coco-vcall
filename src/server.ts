// import * as express from 'express'
// import { Application } from "express";
// const socketIO = require('socket.io')
// import  { Server as SocketIOServer } from "socket.io";
// import { createServer, Server as HTTPServer } from "http";

import * as express from 'express'
import { Application } from "express";
import * as socketIO from 'socket.io'
import { Server as SocketIOServer } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
const path = require('path') ;

export class Server {
    private httpServer: HTTPServer;
    private app: Application;
    private io: SocketIOServer;
    
    private readonly DEFAULT_PORT = 5000;
    
    constructor() {
        this.initialize();
        
        this.handleRoutes();
        
      }
      private configureApp(): void {
        this.app.use(express.static(path.join(__dirname, "../public")));
      }
      
      private initialize(): void {
        this.app = express();
        this.httpServer = createServer(this.app);
        this.io = socketIO(this.httpServer);
        this.configureApp();
        this.handleSocketConnection();
      }
      
      private handleRoutes(): void {
        this.app.get("/", (req, res) => {
          res.send(`<h1>Hello World</h1>`); 
        });
      }
      
      private handleSocketConnection(): void {
        this.io.on("connection", socket => {
          console.log("Socket connected.");
        });
      }
      
      public listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.DEFAULT_PORT, () =>
          callback(this.DEFAULT_PORT)
        );
      }
     }