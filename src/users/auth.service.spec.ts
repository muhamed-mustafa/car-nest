import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService' , () =>
{
    let service : AuthService;
    let fakeUsersService : Partial<UsersService>;

    beforeEach(async () =>
    {
        let users : User[] = [];
        fakeUsersService =
        {
            find : (email : string) => 
            {
                const filteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(filteredUsers);
            },

            create : (email : string , password : string) =>
            {
                const user = 
                {
                    id : Math.floor(Math.random() * 99),
                    email ,
                    password
                } as User;

                users.push(user);
                return Promise.resolve(user)
            }
        };

        const module = await Test.createTestingModule({
          providers : 
          [
            AuthService,
            {
              provide  : UsersService,
              useValue : fakeUsersService
            }
          ]
        }).compile()

        service = module.get(AuthService) // to create instance of AuthService
    });

    it('can create an instance of auth service' , () =>
    {
        expect(service).toBeDefined();
    });

    it('create a new user with a salted and hashed password' , async () =>
    {
        const user = await service.signup('test@test.com' , 'asdf');

        expect(user.password).not.toEqual('asdf');
        const [salt , hashed] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hashed).toBeDefined();
    });

    it('throw an error if user signup with an existing email' , async () =>
    {
        await service.signup('test@test.com' , 'asdf');
        try
        {
            await service.signup('test@test.com' , 'asdf');
        }

        catch(err){};
    });

    it('throw if signin is called with an unused email' , async () =>
    {
       try
       {
          await service.signin('test@test.com' , 'asdf');
       }

       catch(e) {};
    });

    it('throw if an invalid password is provided' , async () =>
    {
        await service.signup('test@test.com' , 'asdf');
        await service.signin('test@test.com' , 'asdf');
    });

    it('returns a user if correct password is provided' , async () =>
    {
        await service.signup('test@test.com' , 'asdf');
        const user = await service.signin('test@test.com' , 'asdf');
        expect(user).toBeDefined();
    });
});