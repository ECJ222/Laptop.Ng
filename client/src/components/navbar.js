import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Drawers from './drawer';
import CartPop from './cartpop';

//styles

const useStyles = makeStyles((theme) => ({
	title: {
		paddingLeft : '20px',
		flexGrow : 1,
	},

	title2:{
		marginRight : theme.spacing(1),
		fontSize : 'xl',
	},

	Mobileicon: {
		paddingLeft :  '30%',
		flexGrow : 1,
	},

	

}));


//component
function NavBar(){
	const classes = useStyles();
	const [mobilebar, setMobilebar] = React.useState(false);
	const [cartshow, setCartshow] = React.useState(false);
	//const theme = useTheme();

	function handleDrawerToggle() {
    	setMobilebar(!mobilebar); //toggles the mobilebar state
  	}

  	function handleCart(){
  		setCartshow(!cartshow); //toggles cart 
  	}
	
		return (
			<div>
				<AppBar position = 'static' style={{background : '#B0DFE5'}}>
					<Toolbar>
						<Hidden xsDown>

							<Link to='/' className="brand-logo"><img src="./laptop_ng.png" /></Link>

							<Typography variant="h6" color='inherit' className={classes.title}>
								<Link to='/' className="brand-logo" style={{color : 'inherit'}}>LaptopNG</Link>
							</Typography>

							<Button color='inherit' className={classes.title2}>
								<Link to='/' className="brand-logo" style={{color : 'inherit'}}>Signup</Link>	
							</Button>
							<Button color = 'inherit' className={classes.title2}>
								<Link to='/' className="brand-logo" style={{color : 'inherit'}}>Login</Link>
							</Button>
						

						</Hidden>
						<Hidden smUp>
					
							<IconButton edge="start" onClick={handleDrawerToggle} >
								<MenuIcon />
							</IconButton>
							
							<Typography className={classes.Mobileicon}>
								<Link to='/' className="brand-logo"><img src="./laptop_ng.png" /></Link>
							</Typography>

							
						</Hidden>


						<Button color='inherit' onClick={handleCart}>
							<ShoppingCartIcon style={{fontSize : 'xl'}}/>
						</Button>

					</Toolbar>
				</AppBar>
				<Drawers 
				mobilebar={mobilebar}
				handleDrawerToggle = {handleDrawerToggle}
				/>
				{/*Window cart*/}
				{cartshow ? <CartPop /> : null}

				
				
				
				
		    </div>

			
			);
	
	
}

export default NavBar
