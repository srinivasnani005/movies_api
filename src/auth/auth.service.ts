// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { comparePassword } from '../utils/crypto.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    let user = await this.usersService.findByEmail(email);
    if (user && await comparePassword(password, user.password)) {
      const usertype = user.usertype;
      return { ...user, usertype };
    }
    return null;
  }

  async login(email: string, password: string): Promise<any> {
    const validatedUser = await this.validateUser(email, password);

    if (!validatedUser) {
      throw new UnauthorizedException('Invalid credentials');  
    }

    const { id, email: userEmail, name, usertype } = validatedUser;
    const payload = { sub: id, email: userEmail, usertype };

    return {
      access_token: this.jwtService.sign(payload),
      user_profile: {
        id,
        email: userEmail,
        name,
        usertype,
      },
    };
  }


  // register(registerDto: RegisterDto) {;
  async register(registerDto: any) {
    this.usersService.create(registerDto);
    // create access token and user profile and return just like login
    const { email, name, usertype } = registerDto;
    const payload = { email, usertype };
    return {
      access_token: this.jwtService.sign(payload),
      user_profile: {
        email,
        name,
        usertype,
      },
    };

  }

  async getUserProfile(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
  

}
