// types/express.d.ts
import 'express';

declare global {
  namespace Express {
    interface Request {
      session?: any; // You can define this more strictly based on your expected token structure
    }
  }
}
