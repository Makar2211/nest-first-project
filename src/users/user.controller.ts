import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly users: UserService) { }
	@Get('get-all-users')
	getUsers() {
		return this.users.getUsers();
	}
}
