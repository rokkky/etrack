interface IErrorMessage {
  [key: string]: string;
}

export const ERROR_MESSAGES: IErrorMessage = {
  email: 'Provide email in valid format',
  required: '":field:" is required field',
  minlength: '":field:" must contatin at least :n: characters',
  maxlength: '":field:" must contatin at most :n: characters',
  max: '":field:" should be at most :n:',
  min: '":field:" should be at least :n:',
  password: 'Password must contain 1 number, 1 upper and 1 lower case letter',
  passMismatch: 'Passwords mismatch',
};
