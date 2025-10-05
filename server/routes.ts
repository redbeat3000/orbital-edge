import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import nasaRoutes from "./api/nasa"; // use .ts now

// ----------------------
// Mount routes function
// ----------------------
export async function registerRoutes(app: Express): Promise<Server> {
  // Other middlewares
  app.use(express.json());

  // Mount NASA API routes
  app.use("/api", nasaRoutes);

  // You can add more application routes here and use storage for CRUD operations
  // Example: storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);
  return httpServer;
}

// ----------------------
// Run standalone if called directly
// ----------------------
if (import.meta.url === `file://${process.argv[1]}`) {
  const app = express();
  const PORT = process.env.PORT || 5000;

  registerRoutes(app).then((server) => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}
