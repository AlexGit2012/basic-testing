// Uncomment the code below and write your tests
import {
  MyAwesomeError,
  rejectCustomError,
  resolveValue,
  throwCustomError,
  throwError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    return resolveValue(42).then((value) => {
      expect(value).toBe(42);
    });
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errMsg = 'Error message';
    expect(() => throwError(errMsg)).toThrow(errMsg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    rejectCustomError().catch((err) => {
      expect(err).toBeInstanceOf(MyAwesomeError);
    });
  });
});
