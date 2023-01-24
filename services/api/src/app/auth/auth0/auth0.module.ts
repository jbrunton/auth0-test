import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { IdentifyModule } from '../identity/identify.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DataModule,
    IdentifyModule,
  ],
  providers: [JwtStrategy],
})
export class Auth0Module {}
