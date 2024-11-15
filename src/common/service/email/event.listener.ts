import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailService } from './email.service';
import { EmailEvent } from './email.event';  // Import the event constants

@Injectable()
export class EmailListener {
    constructor(private readonly emailService: EmailService) { }

    // The @OnEvent decorator listens for the event and triggers the method
    @OnEvent(EmailEvent.EMAIL_TRIGGERED)
    async handleEmailEvent(payload: { to: string; subject: string; body: string; text: string, context?: object }) {
        await this.emailService.handleEmailEvent(payload);
    }
}
