import { Body, Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { UtilService } from 'src/util/util.service';
import { UserLogin, UserRegister } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private util: UtilService) {}

  @HttpCode(HttpStatus.CREATED)
  registerUser(@Body() body: UserRegister) {}

  @HttpCode(HttpStatus.OK)
  userLogin(@Body() body: UserLogin) {}
}
