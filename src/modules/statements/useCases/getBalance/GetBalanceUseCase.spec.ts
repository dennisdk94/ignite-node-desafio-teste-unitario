import { InMemoryUsersRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from '../../../users/useCases/createUser/CreateUserUseCase';
import { InMemoryStatementsRepository } from './../../repositories/in-memory/InMemoryStatementsRepository';
import { GetBalanceUseCase } from './GetBalanceUseCase';

let stamentsRepositoryInMemory: InMemoryStatementsRepository;
let usersRepositoryInMemory: InMemoryUsersRepository;
let getBalanceUseCase: GetBalanceUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Returns list with all deposit operations", () => {
  beforeEach(() => {
    stamentsRepositoryInMemory = new InMemoryStatementsRepository();
    usersRepositoryInMemory = new InMemoryUsersRepository();
    getBalanceUseCase = new GetBalanceUseCase(stamentsRepositoryInMemory, usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })

  it("should be able to list all deposit operations", async () => {
    const user = {
      name: "User Test",
      email: "usertest@email.com",
      password: "1234"
    }

    const createdUser = await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password
    });

    const balance = await getBalanceUseCase.execute({
      user_id: createdUser.id as string
    });

    expect(balance).toHaveProperty("statement");
    expect(balance).toHaveProperty("balance");
  })
})
