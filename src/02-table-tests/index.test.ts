import { Action, simpleCalculator } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 10, b: 2, action: Action.Subtract, expected: 8 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },

  { a: 10, b: 2, action: Action.Multiply, expected: 20 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 0, action: Action.Multiply, expected: 0 },

  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 0, b: 3, action: Action.Divide, expected: 0 },

  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'Operation: $action, a:$a, b:$b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
