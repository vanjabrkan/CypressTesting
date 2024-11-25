import { navigateTo } from "../../support/pageObjects/navigation";
import { onRegister } from '../../support/pageObjects/register';
import { userData } from "../../support/commands";

// This function accepts a test scenario description and test data as input
const validateRegistration = (scenario, testData) => {
  it(`Should not register account ${scenario}`, () => {
    // Validate that the registration page is displayed correctly
    onRegister.validateTheRegisterPage(); 

    // Attempt to fill and submit the registration form with the provided data
    onRegister.register(testData); 

    const nameRegex = /^[a-zA-Z\s]+$/; // Regex to validate names (letters and spaces only)
    const emailRegex = /^\S+@\S+\.\S+$/; // Regex to validate email format
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;  // Regex for password complexity

    // Check if First Name is empty or invalid
    if (!testData.firstName) {
        onRegister.validateErrorMessageField('firstname-error', 'This is a required field.');
    } else if (!nameRegex.test(testData.firstName)) {
        onRegister.validateErrorMessage('First Name is not valid!');
      }

    // Check if Last Name is empty or invalid
    if (!testData.lastName) {
        onRegister.validateErrorMessageField('lastname-error', 'This is a required field.');
    } else if (!nameRegex.test(testData.lastName)) {
        onRegister.validateErrorMessage('Last Name is not valid!');
      }

    // Check if Email is empty or invalid
    if (!testData.email) {
        onRegister.validateErrorMessageField('email_address-error', 'This is a required field.');
    } else if (!emailRegex.test(testData.email)) {
        onRegister.validateErrorMessageField('email_address-error', 'Please enter a valid email address (Ex: johndoe@domain.com).');
      }

 // Check if the Password field is empty, too short, or does not meet complexity requirements
    if (!testData.password) {
        onRegister.validateErrorMessageField('password-error', 'This is a required field.');
    } else if (testData.password.length < 8) {
        onRegister.validateErrorMessageField('password-error', 'Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.');
    } else if (!passwordRegex.test(testData.password)) {
        onRegister.validateErrorMessageField('password-error', 'Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.');
      }

    // Check if the Confirmation Password field is empty or mismatched
    if (!testData.confirmPassword) {
        onRegister.validateErrorMessageField('password-confirmation-error', 'This is a required field.');
    } else if (testData.password !== testData.confirmPassword) {
        onRegister.validateErrorMessageField('password-confirmation-error', 'Please enter the same value again.');
      }
    
  });
};

  describe("Register page", () => {
    // Run before each test: Navigate to the "Create an Account" page
    beforeEach('Open Application and navigate to Create an Account page', () => {
        cy.visit('/') // Open the homepage
        navigateTo.goToCreateAccount(); // Navigate to the registration page
    })

  // Test for an empty registration form
  validateRegistration('with empty form', {
    firstName:'',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Test for invalid First Name (contains invalid characters)
  validateRegistration('with invalid First Name', {
    ...userData, // Use existing test data and override firstName
    firstName: 'user1!'
  });

  // Test for invalid Last Name (contains invalid characters)
  validateRegistration('with invalid Last Name', {
    ...userData, // Use existing test data and override lastName
    lastName: 'user1!'
  });

  // Test for invalid Email format
  validateRegistration('with invalid email', {
    ...userData,  // Use existing test data and override email
    email: 'email@com'
  });

  // Test for invalid Password (too short)
  validateRegistration('with invalid password - less then 8 characters', {
    ...userData, // Use existing test data and override password
    password: 'pass',
    confirmPassword: 'pass'
  });

  // Test for invalid Password (missing uppercase)
  validateRegistration('with invalid password - more than 8 characters but Upper case is missing', {
    ...userData, // Use existing test data and override password
    password: 'mypassword1',
    confirmPassword: 'mypassword1'
  });

  // Test for mismatched Confirmation Password
  validateRegistration('with different confirmation password', {
    ...userData,  // Use existing test data and override password and confirmPassword
    password: 'Mypassword1',
    confirmPassword: 'Mypassword2'
  });

  // Test for valid data and successful registration
  it('Should be able to Create an Account with valid credentials', () => {
    onRegister.validateTheRegisterPage(); // Validate the page
    onRegister.register({
      ...userData // Use valid test data
    });
    // Validate success message for account creation
    onRegister.validateValidCredentials('Thank you for registering with Main Website Store.');
  });
});
