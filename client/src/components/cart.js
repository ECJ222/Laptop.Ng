import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'reactstrap';
import Hidden from '@material-ui/core/Hidden';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ClearIcon from '@material-ui/icons/Clear';
import Checkout from './checkout';
import './cart.css';
import {PuffLoader} from "react-spinners";
import emailjs from 'emailjs-com';

const useStyles = makeStyles((theme) => ({

	table : {
		width : '90%',
	},

	window : {

		paddingLeft : '10%',
		paddingRight : '1%',
		marginTop : '90px',
		animation : 'fadeIn .5s ease-in'
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
		marginTop : '20%',
		animation : 'fadeIn .5s ease-in'
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
	const [cartitems, setCartitems] = React.useState([]);
	const user = localStorage.getItem('name') || null;
	const email = localStorage.getItem('email') || null;
	const [load, setLoad] = React.useState(true);

	React.useEffect(() => {
		axios.get('https://laptopng.herokuapp.com/api-cart')
		.then((res) => {
			setCartitems(res.data);
			setLoad(false);
		})
		.catch((err) => {
			console.log(err)
			setLoad(false);
		});
	});
	
	const modify_qty = async (name, path, action) => {
		await axios.post('https://laptopng.herokuapp.com/cart-increment', {
			email : email,
			user : user,
			name : name,
			path : path,
			action : action

		})
		.then((res) => {
			console.log(res);
			
		})
		.catch((err) => console.log(err));
	}

	const Delete = async (id) => {
		await axios.delete(`https://laptopng.herokuapp.com/delete-cart/${id}`)
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
	}

	const Checkout = async () => {
		let random = Math.floor(Math.random() * 5000) + 1000

		let template_params = {
			to_email : email,
			from_email : 'nicolaschejieh@gmail.com',
			subject : `Laptop.Ng Order #${random}`,
			message_html : `Your order #${random} has been shipped thank you for shopping with Laptop.Ng Your order delivery should arrive within the next 2 weeks.`
		};
		let template_ID = process.env.REACT_APP_TEMPLATE_ID;
		let service = process.env.REACT_APP_SERVICE;
		let user_ID = process.env.REACT_APP_USER_ID;

		await emailjs.send(service, template_ID, template_params, user_ID)
		.then(async () => {
			window.location.href = `https://laptopng.herokuapp.com/cart/checkout/${random}/order`;
			if(email !== null){
				await axios.post('https://laptopng.herokuapp.com/checkout-delete', {
					email : email
				})
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
			}
		})
		.catch((err) => console.log(err));
		
	}  


	return(
		<>
		 <Hidden xsDown>
			<div className={classes.window}>
				<Link to="/"><Button style={{background : '#B0DFE5'}}>
					continue Shopping
				</Button></Link>

				{user !== null ?
					<>
					{load 
						?
						 <>
							<div style={{display: "flex", marginLeft : '40%', marginTop : "6%", zIndex : 1, animation : 'fadeOut .5s ease-out'}}>
								<PuffLoader loading={true} color={"#B0DFE5"} />
							</div>
						 </>
						:
						<>
							<table className={classes.table}>
							  <tbody>
							  {cartitems.filter(items => items.user === user ).length > 0 
							  	?
							  	<>
								    <tr>
								      <th>Item</th>
								      <th>Price</th>
								      <th>Quantity</th>
								      <th>Subtotal</th>
								     
								    </tr>
							    </>
							    :
							    <>
							    		
							    		<tr style={{borderBottom : '0px solid', marginTop : '30px'}}><td style={{color : '#B0DFE5', textTransform : 'uppercase', fontSize : 'xx-large', lineHeight : '1.2', textAlign : 'center'}}>No Item In Cart Continue shopping hopefully you find something you like.</td></tr>
							   		
							    </>
							   }
							    {cartitems.filter(items => items.user === user ).map((item, index) => (
							    	<>
								    <tr key={index} style={{animation : 'fadeIn .5s ease-in'}}>
								     
								     
								     	
									      <td>

									      	<img className={classes.image} src={`https://laptopng.herokuapp.com/static/${item.path}`} alt={`${item.name}`} />
									      	<br/>
									      	<p className={classes.description}>
									      		{item.name}
									      	</p>
									      </td>
									      <td id="price">
									      	${(item.price).toFixed(2)}
									      </td>

									      <td>
										      <div className="counter">
										  		<input value={item.quantity} style={{display : 'inline-block', width : '30%', textAlign : 'center'}} readOnly/>
										  		<br/>
										  		<Button className={classes.button1} onClick={() => modify_qty(item.name, item.path, 'minus')}>-</Button>
										  		<Button className={classes.button2} onClick={() => modify_qty(item.name, item.path, 'add')}>+</Button>
											  </div>
										  </td>
									      <td id="subtotal">
									      	${(item.price * item.quantity).toFixed(2)}
									      </td>
									      <td>
									      	<ClearIcon style={{fontSize : 'xx-large', color : '#B0DFE5', cursor : 'pointer'}} onClick={() => Delete(item._id)}/>
									      </td>

									    
								    

								    </tr>
							        </>
							    ))}


							   
							  </tbody>
							</table>
						</>}
					</>
					:
					<>
						<Link to="/login"><Button style={{background : '#B0DFE5'}}>
							Sign in
						</Button></Link>
					</>
				}

				<br/>
				{cartitems.filter(items => items.user === user ).length > 0 
					?
					<>
						<Button onClick={Checkout} style={{background : '#B0DFE5', float : 'right', marginRight : '200px'}}>
							Checkout
						</Button>
					</>
					:
					<>
					</>}

			</div>
		 </Hidden>

		{/*Mobile*/}

		 <Hidden smUp>
			<div className={classes.Mobilewindow}>
				<Link to="/"><Button style={{background : '#B0DFE5'}}>
					continue Shopping
				</Button></Link>
				{user !== null ?
					<>
					{load 
						?
						 <>
							<div style={{display: "flex", marginLeft : '36%', marginTop : "6%", zIndex : 1, animation : 'fadeOut .5s ease-out'}}>
								<PuffLoader loading={true} color={"#B0DFE5"} />
							</div>
						 </>
					    :
					     <>
							<table className={classes.table}>
							  <tbody>

							    {cartitems.filter(items => items.user === user ).length > 0
							  	?
							  	<>
								    <tr>
								      <th>Item</th>
								      <th>Price</th>
								      <th>Quantity</th>
								      <th>Subtotal</th>
								      
								    </tr>
							    </>
							    :
							    <>
							    	<tr style={{borderBottom : '0px solid', marginTop : '30px'}}><td style={{color : '#B0DFE5', textTransform : 'uppercase', fontSize : 'xx-large', lineHeight : '1.2', textAlign : 'center'}}>No Item In Cart Continue shopping hopefully you find something you like.</td></tr>
							    </>
							   }

							    {cartitems.filter(items => items.user === user ).map((item, index) => (
							    	<>
								    <tr key={index} style={{animation : 'fadeIn .5s ease-in'}}>
								      <td>
								      	<img className={classes.Mobileimage}src={`https://laptopng.herokuapp.com/static/${item.path}`} alt={`${item.name}`} />
								      	<br/>
								      	<br/>
								      	<p className={classes.Mobiledescription}>
								      		{item.name}
								      	</p>

								      </td>
								      <td id="price">
								      	${(item.price).toFixed(2)}
								      </td>
								      <td>
									      <div className="counter">
									  		<input value={item.quantity} style={{paddingLeft : '23px', width : '25px', textAlign : 'centre'}} readOnly/>
									  		<br/>
									  		<Button className={classes.Mobilebutton1} onClick={() => modify_qty(item.name, item.path, 'minus')}>-</Button>
									  		<Button className={classes.Mobilebutton2} onClick={() => modify_qty(item.name, item.path, 'add')}>+</Button>
										  </div>
									  </td>
								      <td id="subtotal">
								      	${(item.price * item.quantity).toFixed(2)}
								      </td>
								      <td>
									      	<ClearIcon style={{fontSize : 'xx-large', color : '#B0DFE5'}} onClick={() => Delete(item._id)}/>
									  </td>
								    </tr>
								    </>
							    ))}

							   
							  </tbody>
							</table>
						</>}
					</>
					:
					<>
						<Link to="/login"><Button style={{background : '#B0DFE5'}}>
							Sign in
						</Button></Link>
					</>
				}
				<br/>
				{cartitems.filter(items => items.user === user ).length > 0 
					?
					<>
						<Button onClick={Checkout} style={{background : '#B0DFE5', float : 'right', marginRight : '30px'}}>
							Checkout
						</Button>
					</>
					:
					<>
					</>}
			</div>
		 </Hidden>
		</>

		);
}

export default Cart;
