import { describe, expect, test, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
// import * as ReactHooks from 'react'
import App from '../src/App'
import Main from '../src/main'


// trying
// Create a root element for React to render into
const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);

describe('App', () => {
  it('renders the App component', () => {
    render(
      <Router>
        <App />
      </Router>,
      { container: document.getElementById('root') } // Specify the container
    );

    // Check if the Navbar is rendered
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    // Check if the initial route is rendered
    // Assuming the SigninForm contains a specific element like a heading or button
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();

    // Print the rendered output to the console for debugging
    screen.debug();
  });
});


// describe('App', () => {
//   it('renders the App component', () => {
//     render(<App/>)

//     // const {container} = render(<App />)
//     expect(screen.getByRole('navgation')).toBeInTheDocument();
    
//     screen.debug(); // prints out the jsx in the App component unto the command line
//   })
// })

// describe('App2', () => {
//     it('renders headline', () => {
//       render(<App title="Vite + React" />);
  
//       screen.debug();
  
//       // check if App components renders headline
//     });
//   });