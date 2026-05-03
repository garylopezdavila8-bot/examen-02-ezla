import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '6AS6GA6RD6', 
    });
  }

  async validate(payload: any) {
    // Esto es lo que se inyecta en req.user
    return { id: payload.id, username: payload.username, role: payload.role };
  }
}