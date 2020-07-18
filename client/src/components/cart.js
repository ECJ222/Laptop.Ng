import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'reactstrap';
import Hidden from '@material-ui/core/Hidden';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

	table : {
		width : '90%',
	},

	window : {

		paddingLeft : '10%',
		paddingRight : '1%',
		marginTop : '1%'
	},
	image : {
		height : '50px',
  		width : '50px'
	},
	description : {
		position : 'relative',
		top : '-10px'
	},
	button1 : {
		marginRight : theme.spacing(0.5),
		width : '15%', 
		height : '1%',
		paddingLeft : '0.5px',
		paddingRight : '0.5px',
		background : '#B0DFE5'
	},
	button2 : {
		width : '15%', 
		height : '1%',
		paddingLeft : '0.5px',
		paddingRight : '0.5px',
		background : '#B0DFE5'
	},
	Mobilewindow : {

		paddingLeft : '10%',
		paddingRight : '1%',
		marginTop : '3%'
	},
	Mobileimage : {
		height : '40px',
  		width : '40px'
	},
	Mobiledescription : {
		position : 'relative',
		top : '-10px',
		fontSize : '10px'
	},
	Mobilebutton1 : {
		marginRight : theme.spacing(0.5),
		marginLeft : theme.spacing(1.5),
		width : '20%', 
		height : '1%',
		paddingLeft : '0.5px',
		paddingRight : '0.5px',
		background : '#B0DFE5'
	},
	Mobilebutton2 : {
		width : '20%', 
		height : '1%',
		paddingLeft : '0.5px',
		paddingRight : '0.5px',
		background : '#B0DFE5'
	}

})
);
function Cart(){
	const classes = useStyles();
	return(
		<>
		 <Hidden xsDown>
			<div className={classes.window}>
				<Link to="/"><Button style={{background : '#B0DFE5'}}>
					continue Shopping
				</Button></Link>
				<table className={classes.table}>
				  <tbody>
				    <tr>
				      <th>Item</th>
				      <th>Price</th>
				      <th>Quantity</th>
				      <th>Subtotal</th>
				    </tr>
				    
				    <tr>
				      <td>
				      	<img className={classes.image} src="http://lghttp.18445.nexcesscdn.net/808F9E/mage/media/catalog/product/cache/2/thumbnail/550x/9df78eab33525d08d6e5fb8d27136e95/v/5/v508_hammer.jpg" />
				      	<br/>
				      	<p className={classes.description}>
				      		16 in. Groove Joint Pliers SKU#1234
				      	</p>
				      </td>
				      <td id="price">
				      	$24.99
				      </td>
				      <td>
					      <div className="counter">
					  		<input id="qty" value="0" style={{width : '10px', borderBottom : '0px solid', height : '15px', paddingLeft : '21px'}}/>
					  		<br/>
					  		<Button className={classes.button1} onclick="modify_qty(-1)">-</Button>
					  		<Button className={classes.button2} onclick="modify_qty(+1)">+</Button>
						  </div>
					  </td>
				      <td id="subtotal">
				      	$24.99
				      </td>
				    </tr>


				   
				  </tbody>
				</table>
				<br/>
				<Button style={{background : '#B0DFE5', float : 'right', marginRight : '200px'}}>
					Checkout
				</Button>
			</div>
		 </Hidden>

		{/*Mobile*/}

		 <Hidden smUp>
			<div className={classes.Mobilewindow}>
				<Button style={{background : '#B0DFE5'}}>
					continue Shopping
				</Button>
				<table className={classes.table}>
				  <tbody>
				    <tr>
				      <th>Item</th>
				      <th>Price</th>
				      <th>Quantity</th>
				      <th>Subtotal</th>
				    </tr>
				    
				    <tr>
				      <td>
				      	<img className={classes.Mobileimage} src="http://lghttp.18445.nexcesscdn.net/808F9E/mage/media/catalog/product/cache/2/thumbnail/550x/9df78eab33525d08d6e5fb8d27136e95/v/5/v508_hammer.jpg" />
				      	<br/>
				      	<p className={classes.Mobiledescription}>
				      		16 in. Groove Joint Pliers SKU#1234
				      	</p>
				      </td>
				      <td id="price">
				      	$24.99
				      </td>
				      <td>
					      <div className="counter">
					  		<input id="qty" value="0" style={{width : '10px', borderBottom : '0px solid', height : '15px', paddingLeft : '21px'}}/>
					  		<br/>
					  		<Button className={classes.Mobilebutton1} onclick="modify_qty(-1)">-</Button>
					  		<Button className={classes.Mobilebutton2} onclick="modify_qty(+1)">+</Button>
						  </div>
					  </td>
				      <td id="subtotal">
				      	$24.99
				      </td>
				    </tr>


				   
				  </tbody>
				</table>
				<br/>
				<Button style={{background : '#B0DFE5', float : 'right', marginRight : '30px'}}>
					Checkout
				</Button>
			</div>
		 </Hidden>
		</>

		);
}

export default Cart