/**
 * This file represents a marketplace page on our e-commerce website.
 * This page will render nested components such as listed items, navigation bar, and the shopping cart.
 *
 * @returns - The components to be rendered
 * @exports Marketplace - Function to be used by other files
 */
//import search bar

// Importing necessary tools
import { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product.jsx';

// Importing CSS file
import './Marketplace.css';

// Defines our Marketplace function to be exported
const Marketplace = () => {
  // Creates state array to store Product components
  const [displayedProducts, setProducts] = useState([]);
  const [value, setValue] = useState('');

  //holds category type
  useEffect(() => {
    if (value) {
      getSpecificComponents(value);
    } else {
      getComponents();
    }
  }, [value]);
  // Creates a new array to hold all products returned from db
  // const allProducts = [];

  // filters for categories pressed
  const getSpecificComponents = (value) => {
    console.log('value', value);
    axios.get(`/api/products/${value}`).then((res) => {
      // Function that changes the state of products array
      setProducts(() => {
        // Saves the current array in newProducts
        const newProducts = [];
        const arr = res.data;

        // Pushes product components to an array passing in data as props
        for (let i = 0; i < arr.length; i++) {
          const newProduct = (
            <Product
              product_id={arr[i]._id}
              id={arr[i].id}
              title={arr[i].title}
              price={arr[i].price}
              category={arr[i].category}
              description={arr[i].description}
              image={arr[i].image}
              rating={arr[i].rating}
            />
          );

          // Pushes each product into allProducts array and displayedProducts arr
          newProducts.push(newProduct);
          // allProducts.push(newProducts);
        }
        console.log('new products get specific', newProducts);
        return newProducts;
      });
    });
  };
  // Function that sends a "GET" request to the DB to fetch product data
  const getComponents = () => {
    // console.log('value getcomponents', value);
    // Sends a "GET" request for products stored in db
    axios
      .get('/api/products')
      .then((res) => {
        // Function that changes the state of products array
        setProducts(() => {
          // Saves the current array in newProducts
          const newProducts = [];
          const arr = res.data;
          // Pushes product components to an array passing in data as props
          for (let i = 0; i < arr.length; i++) {
            const newProduct = (
              <Product
                product_id={arr[i]._id}
                id={arr[i].id}
                title={arr[i].title}
                price={arr[i].price}
                category={arr[i].category}
                description={arr[i].description}
                image={arr[i].image}
                rating={arr[i].rating}
              />
            );

            // Pushes each product into allProducts array and displayedProducts arr
            newProducts.push(newProduct);
          }
          return newProducts;
        });
      })

      // Catches any errors during our get request and displays a message box with the error
      .catch((e) => {
        alert(e);
      });
  };

  // Returns a styled div containing the rendered products
  return (
    // categories
    <div className='marketContainer'>
      <nav>
        <button value='Men' onClick={() => setValue("men's clothing")}>
          Men
        </button>
        <button
          value='Women'
          onClick={() => {
            setValue("women's clothing");
          }}
        >
          Woman
        </button>
        <button
          value='Jewelery'
          onClick={() => {
            setValue('jewelery');
          }}
        >
          {' '}
          Jewelery{' '}
        </button>
        <button
          value='Electronics'
          onClick={() => {
            setValue('electronics');
          }}
        >
          Electronics
        </button>
      </nav>
      <div className='product-display'>{displayedProducts}</div>
    </div>
  );
};

// Exports the Marketplace function
export default Marketplace;
