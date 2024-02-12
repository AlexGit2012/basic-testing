// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const myCallback = jest.fn();
    doStuffByTimeout(myCallback, 2000);
    expect(setTimeout).toHaveBeenLastCalledWith(myCallback, 2000);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const myCallback = jest.fn();
    doStuffByTimeout(myCallback, 2000);
    jest.advanceTimersByTime(2000);
    expect(myCallback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const myCallback = jest.fn();
    doStuffByInterval(myCallback, 2000);
    expect(setInterval).toHaveBeenLastCalledWith(myCallback, 2000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const myCallback = jest.fn();
    doStuffByInterval(myCallback, 2000);
    jest.advanceTimersByTime(6000);
    expect(myCallback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const path = jest.requireActual('path');
    jest.spyOn(path, 'join');
    await readFileAsynchronously('path_to_file');
    expect(path.join).toHaveBeenCalledTimes(1);
  });

  test('should return null if file does not exist', async () => {
    const fs = jest.requireActual('fs');
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const data = await readFileAsynchronously('fake_path');
    expect(data).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fs = jest.requireActual('fs');
    const fsPromises = jest.requireActual('fs/promises');
    const content = 'Inner content';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockReturnValue(content);
    const data = await readFileAsynchronously('path_to_file');
    expect(data).toBe(content);
  });
});
