/// <reference types="cypress" />
// Adding reference for Cypress type definitions to enable IntelliSense support in the editor.
// This helps with autocompletion, error detection, and better understanding of the Cypress API.

import { faker } from '@faker-js/faker';
// Importing the Faker library, which is used for generating fake data.
// Faker is useful for creating dynamic and random values for testing purposes.

export const userData = {
    firstName: faker.person.lastName(), // Generates a random last name to use as "First Name".
    lastName: faker.person.firstName(), // Generates a random first name to use as "Last Name".
    email: faker.internet.email(), // Generates a random, valid email address.
    password: faker.internet.password(), // Generates a random password meeting typical requirements.
    confirmPassword: faker.internet.password() // Generates a random password for the confirmation field (not yet synced with `password`).
};

export const shippingData = {
    firstName: faker.person.lastName(), // Generates a random last name to use as "First Name".
    lastName: faker.person.firstName(), // Generates a random first name to use as "Last Name".
    email: faker.internet.email(), // Generates a random, valid email address.
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    zip: faker.location.zipCode(),
    phone: faker.phone.number(),
};

// Ensuring the confirmPassword field always matches the password field.
// This guarantees that the password and confirm password fields pass basic validation.
userData.confirmPassword = userData.password;
