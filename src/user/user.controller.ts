import { Controller, Get, Post, Patch, Param, UsePipes, ValidationPipe, HttpCode, Body, Put} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from './decorators/user.decorator';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: number) {
    return this.userService.byId(id)
  }

  @Get('by-id/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.byId(+id)
  }

    
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('/:id')
  @Auth()
  updateUser(@Param('id') id: string, @Body() dto: UserUpdateDto) {
    return this.userService.updateProfile(+id, dto)
  }


  @HttpCode(200)
  @Patch('subscribe/:channelId')
  @Auth()
  subscriptionToChannel(@Param('channelId') channelId: string, @CurrentUser('id') id: number) {
    return this.userService.subscribe(+id, +channelId)
  }

  @Get()
  async getUsers() {
    return this.userService.getAll()
  }

}
