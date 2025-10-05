import express, { type Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// ----------------------
// Simulated database
// ----------------------
interface User {
  id: string;
  username: string;
  passwordHash: string;
  role: "admin" | "researcher" | "operator";
}

const users: User[] = [];

// ----------------------
// JWT secret
// ----------------------
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// ----------------------
// Middleware: Authenticate JWT
// ----------------------
export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: User["role"];
    };
    (req as any).user = payload;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
}

// ----------------------
// Middleware: Role check
// ----------------------
export function authorizeRoles(...allowedRoles: User["role"][]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as { id: string; role: User["role"] };
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}

// ----------------------
// 1. Register new user
// ----------------------
router.post("/register", async (req: Request, res: Response) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role)
    return res.status(400).json({ message: "Missing fields" });

  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: `USER-${users.length + 1}`,
    username,
    passwordHash,
    role,
  };
  users.push(newUser);
  res.json({ success: true, message: "User registered", userId: newUser.id });
});

// ----------------------
// 2. Login
// ----------------------
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(404).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "8h",
  });
  res.json({ success: true, token, role: user.role, userId: user.id });
});

// ----------------------
// 3. Get profile (authenticated)
// ----------------------
router.get("/profile", authenticateJWT, (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const user = users.find((u) => u.id === userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ id: user.id, username: user.username, role: user.role });
});

// ----------------------
// 4. List all users (admin only)
// ----------------------
router.get("/all", authenticateJWT, authorizeRoles("admin"), (_req, res) => {
  const safeUsers = users.map((u) => ({
    id: u.id,
    username: u.username,
    role: u.role,
  }));
  res.json(safeUsers);
});

export default router;
