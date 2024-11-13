import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ValidIdPipe } from './pipe/valid-id.pipe';

@Global()
@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: async () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.JWT_EXPIRATION },
            })
        }),
    ],
    providers: [ValidIdPipe],
    exports: [ValidIdPipe, JwtModule]
})
export class CommonModule { }