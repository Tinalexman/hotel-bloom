import { faker } from "@faker-js/faker";
import { getRandomInt } from "@/src/functions/base";
import { tAdmin } from "@/src/stores/adminStore";

export function createRandomAdmin(): tAdmin {
  let active = getRandomInt(1, 10) > 5;
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    active: active,
    createdAt: "",
    token: "",
  };
}

export function createRandomAdmins(count: number): tAdmin[] {
  return faker.helpers.multiple(createRandomAdmin, {
    count: count,
  });
}
