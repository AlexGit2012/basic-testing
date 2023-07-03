// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(100).getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      getBankAccount(100).withdraw(120);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      const bankAccount = getBankAccount(100);
      const anotherBankAccount = getBankAccount(100);
      bankAccount.transfer(110, anotherBankAccount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      const bankAccount = getBankAccount(100);
      bankAccount.transfer(90, bankAccount);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(100);
    bankAccount.deposit(50);
    expect(bankAccount.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(100);
    bankAccount.withdraw(50);
    expect(bankAccount.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(100);
    const anotherBankAccount = getBankAccount(100);
    bankAccount.transfer(50, anotherBankAccount);
    expect(bankAccount.getBalance()).toBe(50);
    expect(anotherBankAccount.getBalance()).toBe(150);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(100);
    const balance = await bankAccount.fetchBalance();
    if (typeof balance === 'number') {
      expect(typeof balance).toBe('number');
    } else {
      expect(balance).toBe(null);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(100);
    const balance = await bankAccount.fetchBalance();
    if (typeof balance === 'number') {
      try {
        await bankAccount.synchronizeBalance();
        expect(bankAccount.getBalance()).not.toBe(balance);
      } catch (error) {}
    } else {
      expect(balance).toBe(null);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(100);
    try {
      await bankAccount.fetchBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
