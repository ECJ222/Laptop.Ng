import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import './cartpop.css';

//styles

const useStyles = makeStyles(() => ({
	boxMobile: {
		margin : '20px 0',
	  	float : 'right',
	  	background : 'white',
	  	width : '320px',
	  	borderRadius : '3px',
	  	padding : '20px',
	  	width : '100%',
	  	position : 'relative',
	  	marginRight : '10px',
	  	zIndex : 1,
	},
	boxWindow: {
		margin : '20px 0',
	  	float : 'right',
	  	background : 'white',
	  	width : '320px',
	  	position : 'relative',
	  	borderRadius : '3px',
	  	padding : '20px',
	  	marginRight : '-90px',
	  	zIndex : 1,
	}
}));

//component

function CartPop(){
	const classes = useStyles();
	return(
		<>
		<Hidden xsDown>
			<div className="container" style={{position : 'relative', zIndex : 1}}>

				<div className={classes.boxWindow}>
					
					<div className="shopping-cart-header">
							<ShoppingCartIcon style={{color : '#777777'}}/>
							<span className="w3-badge" style={{ paddingLeft : '7px' , paddingRight : '7px', width : '9%', height : '10%'}}>3</span>
      						<div className="shopping-cart-total">
        						<span className="lighter-text">Total: </span>
        						<span className="main-color-text">$total</span>
      						</div>
					</div>

					<ul>
						 <li>
        					<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/cart-item1.jpg" alt="item1" />
        					<span className="cart-name">Sony DSC-RX100M III</span>
        					<span className="cart-price">$price</span>
        					<span className="cart-quantity">Quantity: </span>
      					 </li>
      					 
      					 <li>
        					<img style={{float : 'left'}} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/cart-item1.jpg" alt="item1" />
        					<span className="cart-name">Sony DSC-RX100M III</span>
        					<span className="cart-price">$price</span>
        					<span className="cart-quantity">Quantity: </span>
      					 </li>
					</ul>

					<Link to="/cart" className="button">Checkout</Link>

				</div>

			</div>
		</Hidden>

		<Hidden smUp>
			<div className="container" style={{width : '130%'}}>

				<div className={classes.boxMobile}>
					
					<div className="shopping-cart-header">
							<ShoppingCartIcon style={{color : '#777777'}}/>
							<span className="w3-badge" style={{paddingLeft : '7px' , paddingRight : '7px', width : '20px'}}>3</span>
      						<div className="shopping-cart-total">
        						<span className="lighter-text">Total: </span>
        						<span className="main-color-text">$2,229.97</span>
      						</div>
					</div>

					<ul>
						 <li>
        					<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/cart-item1.jpg" alt="item1" />
        					<span className="cart-name">Sony DSC-RX100M III</span>
        					<span className="cart-price">$price</span>
        					<span className="cart-quantity">Quantity: </span>
      					 </li>
      					 
      					 <li>
        					<img style={{float : 'left'}} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/cart-item1.jpg" alt="item1" />
        					<span className="cart-name">Sony DSC-RX100M III</span>
        					<span className="cart-price">$price</span>
        					<span className="cart-quantity">Quantity: </span>
      					 </li>
					</ul>

					<Link to="/cart" className="button">Checkout</Link>

				</div>

			</div>
		</Hidden>


		</>


		);
}

export default CartPop;