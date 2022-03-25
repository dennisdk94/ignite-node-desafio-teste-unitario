import { InMemoryUsersRepository } from './../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from './../createUser/CreateUserUseCase';

let createUserUseCase:CreateUserUseCase;
let usersRepositoryInMemory:  InMemoryUsersRepository

describe("List user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })

  it("should be able to list user", async () => {
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

    const findUser = await usersRepositoryInMemory.findById(createdUser.id as string)

    expect(findUser).toHaveProperty("id");
  })
})
