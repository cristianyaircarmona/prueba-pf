import {Request} from 'express';

import {Express} from "express-serve-static-core"

// declare global {
//   namespace Express {
//     interface Request {
//       userId : string
//     }
//   }
// }

// declare namespace Express {
//   interface Request {
//     userId: string;
//   }
// }

declare module 'express-serve-static-core' {
  interface Request {
    userId : string
  }
} 

// export interface RequestCustom extends Request
// {
//     userId : string;
// }