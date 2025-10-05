import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

import express from 'express';
import nasaRoutes from './api/nasa.js'; // adjust path if needed

const app = express();

// Other middlewares
app.use(express.json());

// Mount NASA API routes
app.use('/api', nasaRoutes);  // all nasa routes will start with /api

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
