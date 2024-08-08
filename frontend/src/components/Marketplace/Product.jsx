// Importing required dependencies
import * as cartService from '../../services/cartService.js';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';
import { Popover } from 'bootstrap';

/**
 * This function takes properties passed from a parent and generates
 * a div to display the data
 */
const Product = (props) => {

    const objID = props.product_id;
    document.querySelectorAll('[data-bs-toggle="popover"]')
    .forEach(popover => {
    new Popover(popover)
  })

    // Function that allows users to add an item to their cart
    const addProductToCart = () => {

        // Calls imported function, passing in Object ID
        cartService.add({id: objID})
            .then(() => {  
                alert('Item added to cart!');
            })
    }

    // Returns a product div to be rendered in the marketplace
    return (
        <div className="product-box">

            <h3 style = {{"margin-bottom":"20px"}}>
                {props.title}   
                <button type="button" className="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="right" data-bs-content={props.description}>
                &#9432;
            </button>
            </h3>
           
            <div className="image-container" style = {{"margin-bottom":"-7px"}}>            
                <img src={props.image}/>
            </div>


            <h4>
                ${props.price.toFixed(2)} USD
                <button onClick={ addProductToCart }>
                    Add to Cart
                </button>
                {/* Item Category: { props.category } */}
            </h4>

            {/* <div className="description-box">

                {props.description}
            </div> */}
    </div>
  );
};

// Exports the Product constructor
export default Product;
