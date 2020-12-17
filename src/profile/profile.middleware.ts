import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express'

@Injectable()
export class ProfileMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {

    // res.json({
    //   message: 'halo'
    // })

    next();
  }
}
