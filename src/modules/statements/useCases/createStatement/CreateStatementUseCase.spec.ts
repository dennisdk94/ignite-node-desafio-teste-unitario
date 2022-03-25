
import { InMemoryStatementsRepository } from './../../repositories/in-memory/InMemoryStatementsRepository';
import { CreateStatementUseCase } from './CreateStatementUseCase';
import { InMemoryUsersRepository } from './../../../users/repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from '../../../users/useCases/createUser/CreateUserUseCase';

let statementRepositoryInMemory: InMemoryStatementsRepository;
let userRepositoryInMemory: InMemoryUsersRepository;
let createStatementUseCase: CreateStatementUseCase;
let createUserUseCase: CreateUserUseCase;


describe("Create a new statement", () => {
  beforeEach(() => {
    statementRepositoryInMemory = new InMemoryStatementsRepository();
    userRepositoryInMemory = new InMemoryUsersRepository();
    createStatementUseCase = new CreateStatementUseCase(userRepositoryInMemory,statementRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  })

  it("should be able to create a new statement", async () => {
    const user = {
      name: "User Test",
      email: "usertest@email.com",
      password: "12345678"
    }

    const createdUser = await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password
    });

    enum OperationType {
      DEPOSIT = 'deposit',
      WITHDRAW = 'withdraw',
    }

    const createdStatement = await createStatementUseCase.execute({
      user_id: createdUser.id as string,
      type: 'deposit' as OperationType,
      description: 'Description test',
      amount: 2
    })

    expect(createdStatement).toHaveProperty("id");
  })
})
