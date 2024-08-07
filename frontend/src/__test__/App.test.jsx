// import React from 'react';
// // import { render } from '@testing-library/react';
// import '@testing-library/jest-dom'; // For extended matchers
// import App from '../App';
// import { MemoryRouter } from 'react-router-dom'; // Use MemoryRouter for routing in tests

// test('renders App component without crashing', () => {
//   // Render the App component wrapped in a MemoryRouter
//   render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>
//   );

//   // Simply check if the component renders by querying for an element
//   // For example, you might check if the Navbar is present
//   const navbarElement = document.querySelector('nav'); // Adjust selector if necessary

//   // Assert that the element is in the document
//   expect(navbarElement).toBeInTheDocument();
// });

import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from '../context/AuthContext';

// Mocking image import
// jest.mock('../../assets/icons8-shop-96.png', () => 'mocked-image.png');

// Ensure that a root element exists before each test
// jest.mock('react-dom/client', () => ({
//     createRoot: () => ({
//       render: jest.fn(),
//     }),
//   }));
  
//   beforeEach(() => {
//     document.body.innerHTML = '<div id="root"></div>';
//   });
  
//   test('renders App component', () => {
//     render(<App />);
//     // Your test code here
//   });

// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useNavigate: () => jest.fn(),
//   }));
  
//  // Mock the DOM
// beforeEach(() => {
//     document.body.innerHTML = '<div id="root"></div>';
//   });

//   test('renders App component', () => {

//     expect(true).toBeTruthy()
//     render(
//         <App />
//     );
//   });

//   jest.mock('../src/services/authService', () => ({
//     getUser: () => ({ id: 1, name: 'Test User' }),
//   }));

beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });
  
  test('renders App component', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));