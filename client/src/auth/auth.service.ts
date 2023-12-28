import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}

      async signIn(username, pass) {
        const user = await this.usersService.findOne(username);
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        await this.usersService.updateIsActive(user.id, true);
        const payload = { userId: user.id, username: user.username };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }

      async signOut(id:number){
        const user = await this.usersService.findById(id);

        if(user){
            await this.usersService.updateIsActive(user.id,false);
        }
      }
}
