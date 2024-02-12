// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const ms = 200;
    const callback = jest.fn(() => {});
    doStuffByTimeout(callback, ms);
    expect(setTimeout).toBeCalledWith(callback, ms);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const ms = 200;
    const callback = jest.fn(() => {});
    doStuffByTimeout(callback, ms);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(300);
    expect(callback).toBeCalled();
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
    const ms = 200;
    const callback = jest.fn(() => {});
    doStuffByInterval(callback, ms);
    expect(setInterval).toBeCalledWith(callback, ms);
  });

  test('should call callback multiple times after multiple intervals', async () => {
    jest.spyOn(global, 'setInterval');
    const ms = 200;
    const callback = jest.fn(() => {});
    doStuffByInterval(callback, ms);
    jest.advanceTimersByTime(650);
    expect(callback).toBeCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = './index.ts';
    jest.spyOn(path, 'join');
    readFileAsynchronously(pathToFile);
    expect(path.join).toBeCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = './index.ts';
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = './index.ts';
    const content = 'Some content';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(content);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(content);
  });
});
