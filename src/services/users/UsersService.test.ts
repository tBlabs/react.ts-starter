import { User } from './../../models/User';
import { UsersService } from './UsersService';
test('GetOne(userId)', async () =>
{
    const usersService: UsersService = new UsersService();

    usersService.FetchAll();

    const user: User | null = await usersService.GetOne('1234');

    expect(user).not.toBeNull();
});