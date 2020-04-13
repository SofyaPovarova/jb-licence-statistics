import React from 'react';
import { render } from '@testing-library/react';
import StatisticsApp from './StatisticsApp';

test('renders learn react link', () => {
  const { getByText } = render(<StatisticsApp />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
