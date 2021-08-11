import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { OperationLogsDTO } from './dto/operationLogs.dto';
import { OperationLogsService } from './operationLogs.service';
import { JwtService } from '@nestjs/jwt';
import { MethodToAction } from './helpers/MethodToActionParser.helper';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private operationLogsService: OperationLogsService,
    private readonly jwtService: JwtService,
  ) { }

  use(req: Request, res: Response, next: NextFunction) {
    const url = req.route.path;
    const actions = url.split('/');
    const operation_type = MethodToAction(req.method);
    const object_type = actions[1];

    const user = (!req.headers.authorization) ? null : this.jwtService.decode(req.headers.authorization.slice(7, -1))['id'];

    let body = res.req.body;
    const params = res.req.params;

    if (body.password) body = {...body, password: null}

    const createOperationLogsDto: OperationLogsDTO = {
      id: null,
      operation_type,
      object_type,
      data: {
        user: { id: user },
        body,
        params
      },
    }

    this.operationLogsService.save(createOperationLogsDto);

    next();
  }
}
