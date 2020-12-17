import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express'

@Injectable()
export class TodoMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {

    let { avatarname, power } = req.body
    console.log(avatarname, power);
    
    next();
  }
}
