const UsersService = require('../lib/infrastructure/users/users.service');
const UsersRepository = require('../lib/infrastructure/users/users.repository');

jest.mock('../lib/infrastructure/users/users.repository');

describe('usersService', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        // UsersRepository.mockClear();
    });

    it('getAllUsers', () => {
        const users = [{ name: 'Joao' }, { name: 'Pedro' }];
        const resp = { data: users };
        UsersRepository.getAllUsers.mockResolvedValue(resp);

        return UsersService.getAllUsers().then(data =>
            expect(data).toEqual(resp)
        );
    });

    it('getUser', () => {
        const id = 1;
        const user = { name: 'Joao' };
        const resp = { data: user };
        UsersRepository.getUserById.mockResolvedValue(resp);

        return UsersService.getUserById(id).then(data =>
            expect(data).toEqual(resp)
        );
    });

    it('getUserByEmail', () => {
        const email = 'joao@sapo.pt';
        const user = { name: 'Joao' };
        const resp = { data: user };
        UsersRepository.getUserByEmail.mockResolvedValue(resp);

        return UsersService.getUserByEmail(email).then(data =>
            expect(data).toEqual(resp)
        );
    });

    it('createUser', () => {
        const input = { name: 'Joao', email: 'joao@sapo.pt', nif: 12492821 };
        const user = {
            _id: 1002,
            name: 'Joao',
            email: 'joao@sapo.pt',
            nif: 12492821,
        };
        const resp = { data: user };
        UsersRepository.createUser.mockResolvedValue(resp);

        return UsersService.createUser(input).then(data =>
            expect(data).toEqual(resp)
        );
    });

    it('updateUserById', () => {
        const input = { name: 'Joao', email: 'joao@sapo.pt', nif: 12492821 };
        const user = {
            _id: 1002,
            name: 'Joao',
            email: 'joao@sapo.pt',
            nif: 12492821,
        };
        const resp = { data: user };
        UsersRepository.updateUserById.mockResolvedValue(resp);

        return UsersService.updateUserById(1002, input).then(data =>
            expect(data).toEqual(resp)
        );
    });

    it('deleteUserById', () => {
        const input = { name: 'Joao', email: 'joao@sapo.pt', nif: 12492821 };
        const user = {
            _id: 1002,
            name: 'Joao',
            email: 'joao@sapo.pt',
            nif: 12492821,
        };
        const resp = { data: user };
        UsersRepository.deleteUserById.mockResolvedValue(resp);

        return UsersService.deleteUserById(1002).then(data =>
            expect(data).toEqual(resp)
        );
    });
});
