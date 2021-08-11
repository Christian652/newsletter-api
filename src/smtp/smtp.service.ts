import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import MailOptions from './Interfaces/mail-options.interface';
import { MailerService } from '@nestjs-modules/mailer';
"use strict";
@Injectable()
export class SmtpService {
    constructor(private mailerService: MailerService) { }

    public async sendEmail(options: MailOptions) {
        try {
            await this.mailerService.sendMail({
                to: options.to,
                from: 'christianferreira652@gmail.com',
                subject: options.subject,
                template: './mail',
                context: { 
                    text: options.text
                },
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_GATEWAY);
        }
        
    }
}
