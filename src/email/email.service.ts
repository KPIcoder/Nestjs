import { Injectable } from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
    constructor(private readonly emailService: MailerService) {}

    async sendMail(email: string, name: string): Promise<void> {
        await this.emailService.sendMail({
            to: email,
            from: process.env.EMAIL,
            subject: 'Test2',
            template: 'welcome',
            context: {
                name
            }
        })
    }
}
