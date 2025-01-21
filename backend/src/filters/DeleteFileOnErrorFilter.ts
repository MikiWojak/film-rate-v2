import {
    Catch,
    ArgumentsHost,
    ExceptionFilter,
    BadRequestException
} from '@nestjs/common';
import * as fs from 'fs';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class DeleteFileOnErrorFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const { file } = request;

        if (!file) {
            response.status(status).json(exception.getResponse());

            return;
        }

        fs.unlink(file.path, err => {
            if (err) {
                console.error(err);

                return err;
            }
        });

        response.status(status).json(exception.getResponse());
    }
}
