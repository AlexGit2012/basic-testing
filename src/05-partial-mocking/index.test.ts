// Uncomment the code below and write your tests

import { mockOne, mockThree, mockTwo, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: () => {},
    mockTwo: () => {},
    mockThree: () => {},
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const logSpy = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(logSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(logSpy).toHaveBeenCalledWith('I am not mocked');
  });
});
