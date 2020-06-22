import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
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
	  	zIndex : 0,
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
			<div className="container">

				<div className={classes.boxWindow}>
					
					<div className="shopping-cart-header">
							<ShoppingCartIcon style={{color : '#777777'}}/>
							<span className="w3-badge">3</span>
      						<div className="shopping-cart-total">
        						<span className="lighter-text">Total: </span>
        						<span className="main-color-text">$2,229.97</span>
      						</div>
					</div>

				</div>

			</div>
		</Hidden>

		<Hidden smUp>
			<div className="container">

				<div className={classes.boxMobile}>
					
					<div className="shopping-cart-header">
							<ShoppingCartIcon style={{color : '#777777'}}/>
							<span className="w3-badge">3</span>
      						<div className="shopping-cart-total">
        						<span className="lighter-text">Total: </span>
        						<span className="main-color-text">$2,229.97</span>
      						</div>
					</div>

				</div>

			</div>
		</Hidden>


		</>


		);
}

export default CartPop;