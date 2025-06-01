import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ValidationPipe,
  UsePipes,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import CreateUserDto from './dto/create.dto';
import UpdateUserPasswordDto from './dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserPasswordDto,
  ) {
    return this.userService.updatePassword(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
