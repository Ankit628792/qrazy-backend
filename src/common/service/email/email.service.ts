import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EmailEvent } from './email.event';  // Import the event constants
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);
    constructor(
        private readonly eventEmitter: EventEmitter2,
        private readonly mailerService: MailerService,
    ) { }


    private async sendDynamicEmail(to: string, subject: string, body: string, text: string, context: object = {}) {
        try {
            await this.mailerService.sendMail({
                from: "",
                to,
                subject,
                text,
                html: body,
                ...context
            });
            this.logger.log(`Email sent to ${to} with subject: ${subject}`);
        } catch (error) {
            this.logger.error('Error sending email: ', error);
            throw error;
        }
    }

    async handleEmailEvent(payload: { to: string; subject: string; body: string; text: string, context?: object }) {
        await this.sendDynamicEmail(payload.to, payload.subject, payload.body, payload.text, payload.context);
    }

    sendEmailViaEvent(to: string, subject: string, body: string, text: string, context?: object) {
        this.eventEmitter.emit(EmailEvent.EMAIL_TRIGGERED, { to, subject, body, text, context });
    }
}
