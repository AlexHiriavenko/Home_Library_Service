import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserPasswordDto from './dto/update-user.dto';
import { validationPipe } from '../../common/pipes/validation.pipe';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import ResponseUserDto from './dto/response-user.dto';
import {
  ApiCreate,
  ApiDelete,
  ApiGet,
  ApiGetById,
  ApiUpdate,
} from '../../common/decorators/docApi.decorators';
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  @ApiCreate('user', CreateUserDto, ResponseUserDto)
  @UsePipes(validationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiGet('users', ResponseUserDto)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiGetById('user')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiUpdate('user', UpdateUserPasswordDto, ResponseUserDto)
  @ApiResponse({ status: 403, description: 'old Password is wrong' })
  @UsePipes(validationPipe)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserPasswordDto,
  ) {
    return this.userService.updatePassword(id, updateUserDto);
  }

  @Delete(':id')
  @ApiDelete('user')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
