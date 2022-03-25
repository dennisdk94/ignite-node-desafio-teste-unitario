import { CreateUserUseCase } from "./CreateUserUseCase"
import { InMemoryUsersRepository } from './../../repositories/in-memory/InMemoryUsersRepository';

let createUserUseCase:CreateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it("should be able to create a new user", async () => {
    const user = {
      name: "User Test",
      email: "usertest@email.com",
      password: "1234"
    }

    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password
    })

    const createdUser = await usersRepositoryInMemory.findByEmail(user.email);

    expect(createdUser).toHaveProperty("id");
  })
})
