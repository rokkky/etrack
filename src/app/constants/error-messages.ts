interface IErrorMessage {
  [key: string]: string;
}

export const ERROR_MESSAGES: IErrorMessage = {
  email: 'Provide email in valid format',
  required: '":field:" is required field',
  minlength: '":field:" must contatin at least :n: characters',
  maxlength: '":field:" must contatin max :n: characters',
  password: 'Pssword should contain 1 number, 1 upper and 1 lower case letter',
};
