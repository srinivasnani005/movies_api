// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';  

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  
  @UseGuards(JwtAuthGuard)  
  @Post('profile')
  async getProfile(@Request() req) {
    const email = req.user.email;  // The email is included in the user object from the JWT token
    return await this.authService.getUserProfile(email);  // Fetch the full user profile from the service
  }
  @Post('signup')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
