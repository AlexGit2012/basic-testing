// Uncomment the code below and write your tests

import {
  THROTTLE_TIME,
  throttledGetDataFromApi,
} from '07-mocking-lib-api/index';
import axios from 'axios';

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosCreateData = {
      baseURL: 'https://jsonplaceholder.typicode.com',
    };
    jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/posts');
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(axios.create).toBeCalledWith(axiosCreateData);
  });

  test('should perform request to correct provided url', async () => {
    const endpoint = '/posts';
    jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi(endpoint);
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(axios.Axios.prototype.get).toBeCalledWith(endpoint);
  });

  test('should return response data', async () => {
    const oneUserUrl = '/posts/1';
    const data = {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    };
    const result = await throttledGetDataFromApi(oneUserUrl);
    expect(JSON.stringify(result)).toBe(JSON.stringify(data));
  });
});
