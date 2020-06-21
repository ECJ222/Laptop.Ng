import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import {Link} from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
//import CloseIcon from '@material-ui/icons/Close';
//import Drawer from '@material-ui/core/Drawer';
import Drawers from './drawer'

//styles
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	title: {
		paddingLeft : '20px',
		flexGrow : 1,
	},

	Mobileicon: {
		paddingLeft :  '30%',
		flexGrow : 1,
	},

	drawerPaper: {
   		width: drawerWidth,
   		textAlign : 'justify',
  	},

  	drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    }},

    closeMenuButton: {
    	marginRight: 0,
    	marginLeft: 'auto',
  	},

}));


//component
function NavBar(){
	const classes = useStyles();
	const [mobilebar, setMobilebar] = React.useState(false);
	//const theme = useTheme();

	function handleDrawerToggle() {
    	setMobilebar(!mobilebar); //toggles the mobilebar state
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

						</Hidden>
						<Hidden smUp>
					
							<IconButton edge="start" onClick={handleDrawerToggle} >
								<MenuIcon />
							</IconButton>
							
							<Typography className={classes.Mobileicon}>
								<Link to='/' className="brand-logo"><img src="./laptop_ng.png" /></Link>
							</Typography>

							
						</Hidden>


						<Button color='inherit'>
							<ShoppingCartIcon />
						</Button>

					</Toolbar>
				</AppBar>
				<Drawers 
				mobilebar={mobilebar}
				handleDrawerToggle = {handleDrawerToggle}
				/>
		    </div>

			
			);
	
	
}

export default NavBar
