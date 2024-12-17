import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
expect.extend(matchers);