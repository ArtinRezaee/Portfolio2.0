import * as validator from 'validator'

const emailOptions = {
  gmail_remove_dots: false,
};

/**
 * Clean up a string
 * @param input
 */
export const sanitizeString = (input: string) => {
  return input.replace(/[^\x20-\x7E]/g, '');
};

/**
 * Convert input to string
 * @param input
 */
/* tslint:disable */
export const toString = (input: any) => {
  let newString = String(input);

  if (!newString || newString.length <= 0 || newString === 'undefined' || newString === 'null') {
    return '';
  }
  /* tslint:enable */

  newString = validator.trim(sanitizeString(newString));
  if (newString.length <= 0) {
    return '';
  }

  return newString;
};

/**
 * Check if request body is valid
 * @param body Request body
 */
export const isBodyInvalid = (body: Object) => {
  if (!body || body === 'null' || body === 'undefined') {
    return true;
  }

  if (body instanceof Function) {
    return true;
  }

  return Object.keys(body).length === 0;
};

/**
 * Normalize the email using the validator library
 * @param email Email to normalize
 */
export const normalizeEmail = (email: string) => {
  let parsedEmail = toString(email);

  if (parsedEmail.length <= 0) {
    return '';
  }

  if (!validator.isEmail(email)) {
    return '';
  }
  const normalEmail = validator.normalizeEmail(email, emailOptions);

  if (typeof normalEmail === 'string') {
    parsedEmail = normalEmail;
  }

  if (!parsedEmail || parsedEmail.length <= 0) {
    return '';
  }

  return parsedEmail;
};
