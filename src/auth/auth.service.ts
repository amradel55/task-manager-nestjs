import { Injectable} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
        ) {}

    async validateUser(user_name: string, password: string): Promise<User> {
        const user = await this.usersService.findUserWithPass(user_name);
            
        if (user && bcrypt.compareSync(password, user.password)) {
            return user;
        }

        return null;
    }

    async login(user: User) {
        
        const payload = {name: user.name, sub: user.id};
        
        return {
            access_token : this.jwtService.sign(payload),
            user: user,
        }
    }

}
