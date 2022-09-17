import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import {MailerModule} from "@nestjs-modules/mailer";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { EmailModule } from './email/email.module';
import {join} from "path"

console.log(__dirname);

@Module({
  imports: [UserModule, AuthModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.EMAIL_SERVER,
          port: process.env.EMAIL_PORT,
          secure: false, // upgrade later with STARTTLS
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
          },
        },
        // defaults: {
        //   from:'"nest-modules" <modules@nestjs.com>',
        // },
        template: {
          dir: join(__dirname, 'email', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
