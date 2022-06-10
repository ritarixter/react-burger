export function checkEmail(value) {
  return value && /^\w+@[a-z]+\.[a-z]+$/.test(value) ? true : false;
}