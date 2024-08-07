// import { describe, expect, test, it } from 'vitest'
// import { sum } from './sum.js'
// import { render, screen } from '@testing-library/react'
// import App from '../src/App.jsx'
// import { BrowserRouter as Router } from 'react-router-dom'

// describe('testing works', () => {
//   test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3)
//   })
// })

// // describe('rendering works', () => {
// //   it('render App', () => {
// //     render(<App/>);
// //     screen.debug();
// //   })
// // })

// const root = document.createElement('div');
// root.setAttribute('id', 'root');
// document.body.appendChild(root);

// describe('App', () => {
//   let app;
//   let container = null;
  
//     container = document.createElement("div");
//     document.body.appendChild(container);
    
//   it('renders the App component', () => {
//     app = render(
//       <Router>
//         <App />
//       </Router>,
//       { container: document.getElementById('root') } // Specify the container
//     );
//     expect(!!app.container).toEqual(true)

//     // Check if the Navbar is rendered
//     // expect(screen.getByRole('navigation')).toBeInTheDocument();

//     // Check if the initial route is rendered
//     // Assuming the SigninForm contains a specific element like a heading or button
//     // expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();

//     // Print the rendered output to the console for debugging
//     screen.debug();
//   });
// });


// // it('render basic', async () => {
// //     const result = renderHTML(h('div', { class: 'foo' }))
// //     await expect(result).toMatchFileSnapshot('./test/basic.output.html')
// // })