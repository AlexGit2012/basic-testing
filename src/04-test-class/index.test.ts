// Uncomment the code below and write your tests
import lodash from 'lodash';
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);
    expect(() => account.withdraw(150)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const accountSender = getBankAccount(100);
    const accountReceiver = getBankAccount(100);
    expect(() => accountSender.transfer(200, accountReceiver)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const accountSender = getBankAccount(100);
    expect(() => accountSender.transfer(100, accountSender)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(10);
    expect(account.getBalance()).toBe(110);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(10);
    expect(account.getBalance()).toBe(90);
  });

  test('should transfer money', () => {
    const accountSender = getBankAccount(100);
    const accountReceiver = getBankAccount(100);
    accountSender.transfer(50, accountReceiver);
    expect(accountSender.getBalance()).toBe(50);
    expect(accountReceiver.getBalance()).toBe(150);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    const mockedValue = 40;
    lodash.random = jest.fn(() => mockedValue);
    return account.fetchBalance().then((value) => {
      expect(typeof value).toBe('number');
    });
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    const mockedValue = 40;
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(mockedValue);
    return account.synchronizeBalance().then(() => {
      expect(account.getBalance()).toBe(mockedValue);
    });
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    const mockedValue = null;
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(mockedValue);
    await account.synchronizeBalance().catch((error) => {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    });
  });
});
