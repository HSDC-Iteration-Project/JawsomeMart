import React from 'react';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';

const history = createMemoryHistory();

export const BrowserRouter = ({ children }) => (
  <Router history={history}>
    {children}
  </Router>
);

export const MemoryRouter = BrowserRouter; // Alias for compatibility

// Mock other features if needed
export const useNavigate = () => jest.fn();