import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ValidIdPipe } from './pipe/valid-id.pipe';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './service/email/email.service';
import { EmailListener } from './service/email/event.listener';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Global()
@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: async () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.JWT_EXPIRATION },
            })
        }),
        EventEmitterModule.forRoot(),
        MailerModule.forRoot({
            transport: {
                host: process.env.EMAIL_HOST,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                },
            },
        }),
    ],
    providers: [ValidIdPipe, EmailService, EmailListener],
    exports: [ValidIdPipe, JwtModule, EmailService]
})
export class CommonModule { }