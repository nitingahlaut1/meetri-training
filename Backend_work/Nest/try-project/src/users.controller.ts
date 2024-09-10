import {
  Controller,
  Get,
  Put,
  Post,
  Param,
  Query,
  Req,
  Res,
  Headers,
  Body,
  Delete,
} from '@nestjs/common';
import { createUserDto } from './dto';

import { Request, Response } from 'express';
// @Controller('/users')
// export class UserController {
//   @Post('/profile')
//   getProfile(@Body() body: Record<string, any>) {
//     console.log(body);
//     return 'success';
//   }
// }

let USERS = [];

@Controller('/users')
export class UserController {
  @Post() //add  user data
  getProfile(@Body() createUserDto: createUserDto) {
    USERS.push(createUserDto);
    // console.log(createUserDto);
    // console.log(USERS);
    return 'user added';
  }

  @Get() //get all the users
  getUsers() {
    return USERS;
  }

  @Get(':id') //get datails of user by its id
  getbyId(@Param('id') id: number) {
    return USERS.find((user) => +user.id == +id);
  }

  //update the user details by Put method
  @Put(':id')
  updatebyId(@Param('id') id: number, @Body() updateUserdto: createUserDto) {
    const useridx = USERS.find((user) => +user.id == +id);
    console.log('userDto: ', updateUserdto);
    if (!useridx) {
      return;
    }
    console.log('before update : ', USERS);
    USERS[useridx] = updateUserdto;
    console.log('after update : ', USERS);
  }
  //delete user by its id

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    USERS = USERS.filter((user) => +user.id != +id);
  }
}

@Controller('/album')
export class AlbumContainer {
  @Get()
  async getAlbum(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // console.log(req);
    res.status(200);
    res.json({
      hello: 'world',
    });
  }
}

interface Iperson {
  id: number;
  name: string;
}
@Controller('/person')
export class PersonId {
  @Get()
  //   getDetails(@Param() params: Iperson)
  //   getDetails(@Query() params: Iperson)
  getDetails(@Headers() headers: Record<string, any>) {
    console.log(headers);
    return 'success';
  }
}
