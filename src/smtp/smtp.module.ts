import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { SmtpService } from './smtp.service';
@Module({
  providers: [SmtpService],
  exports: [
    SmtpService
  ],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'christianguitarr2@gmail.com',
          pass: 'guitarra652',
        },
        tls: {
          rejectUnauthorized: false
        }
      },
      defaults: {
        from: 'christianguitarr2@gmail.com',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
})
export class SmtpModule {}

