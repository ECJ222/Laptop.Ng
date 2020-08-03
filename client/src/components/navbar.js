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
import {Popover, PopoverHeader, PopoverBody } from 'reactstrap'; //handle cart popover
import { useHistory } from 'react-router-dom';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

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
	const [popoverOpen, setPopoverOpen] = React.useState(false);
	const token = localStorage.getItem('token') || null;
	const Name = localStorage.getItem('name') || null ;
	const history = useHistory();
	const [anchorEl, setAnchorEl] = React.useState(null);
  	const open = Boolean(anchorEl);
  	
  	
  	const toggle = (e) => {
  		setPopoverOpen(!popoverOpen);
  	}

  	const removeToken = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('name');
		localStorage.removeItem('email');
		if(window.location.pathname === '/'){
			window.location.href = 'https://laptopng.herokuapp.com';
		}else{
			history.push('/');
		}
		

	}

	const showLogout = (e) =>{
		setAnchorEl(e.currentTarget);	
	}


	const handleClose = () => {
		
	    setAnchorEl(null);
	  };
	//const theme = useTheme();

	const handleDrawerToggle = () => {
    	setMobilebar(!mobilebar); //toggles the mobilebar state
  	}



	
		return (
			<div>
				<AppBar position="fixed" style={{background : '#B0DFE5', paddingLeft : '5%', paddingRight : '5%'}}>
					<Toolbar>
						<Hidden xsDown>

							<Link to='/' className="brand-logo"><img src="./laptop_ng.png" /></Link>

							<Typography variant="h6" color='inherit' className={classes.title}>
								<Link to='/' className="brand-logo" style={{color : 'inherit'}}>LaptopNG</Link>
							</Typography>
							{token == null ? 
								<>
									<Button color='inherit' className={classes.title2}>
										<Link to='/register' className="brand-logo" style={{color : 'inherit'}}>Signup</Link>	
									</Button>
									<Button color = 'inherit' className={classes.title2}>
										<Link to='/login' className="brand-logo" style={{color : 'inherit'}}>Login</Link>
									</Button>
								</>
							:
								<>
									
									{!open
										? 
										   <>
											<Typography className={classes.title2} style={{color : 'inherit', cursor : 'pointer'}} onClick={showLogout}>Hi {Name} <KeyboardArrowDownIcon style={{fontSize : 'medium'}}/></Typography>
										   </>
									    :
									    	<>
											 <Typography className={classes.title2} style={{color : 'inherit', cursor : 'pointer'}} onClick={showLogout}>Hi {Name} <KeyboardArrowUpIcon style={{fontSize : 'medium'}}/></Typography>

											 
											 
											 <Menu
										        id="fade-menu"
										        anchorEl={anchorEl}
										        keepMounted
										        open={open}
										        onClose={handleClose}
										        TransitionComponent={Fade}
										        elevation={0}
											    getContentAnchorEl={null}
											    anchorOrigin={{
											      vertical: 'bottom',
											      horizontal: 'center',
											    }}
											    transformOrigin={{
											      vertical: 'top',
											      horizontal: 'center',
											    }}
										        style={{marginTop : '3px'}}
										      >
										        <MenuItem onClick={removeToken} style={{color : '#B0DFE5'}}>Logout</MenuItem>
										        
										      </Menu>
											 
										    </>}
									
								</>
							}

						</Hidden>
						<Hidden smUp>
					
							<IconButton edge="start" onClick={handleDrawerToggle} >
								<MenuIcon />
							</IconButton>
							
							<Typography className={classes.Mobileicon}>
								<Link to='/' className="brand-logo"><img src="./laptop_ng.png" /></Link>
							</Typography>

							
						</Hidden>


						<Button  color='inherit' id="cartpopover">
							<ShoppingCartIcon style={{fontSize : 'xl'}}/>
						</Button>


					</Toolbar>
				</AppBar>
				<Drawers 
				mobilebar={mobilebar}
				handleDrawerToggle = {handleDrawerToggle}
				/>
				
				
				{/*Window cartpopup*/}
				<Hidden xsDown>
					<Popover placement="bottom" isOpen={popoverOpen} target="cartpopover" toggle={toggle} style={{position : 'relative', top : '20px', left : '-180px'}}>
						<PopoverBody>
							<CartPop />
						</PopoverBody>
					</Popover>
				</Hidden>

				<Hidden smUp>
					<Popover placement="bottom" isOpen={popoverOpen} target="cartpopover" toggle={toggle} style={{position : 'relative', top : '10px', left : '-90px'}}>
						<PopoverBody>
							<CartPop />
						</PopoverBody>
					</Popover>
				</Hidden>

			
				
				
				
				
		    </div>

			
			);
	
	
}

export default NavBar;
