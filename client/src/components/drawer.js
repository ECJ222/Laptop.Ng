import React from 'react';
import {Link} from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
//styles
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	title: {
		paddingLeft : '20px',
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
function Drawers(props){
	const classes = useStyles();
	const history = useHistory();
	const theme = useTheme();
	const token = localStorage.getItem('token') || null;
	const Name = localStorage.getItem('name') || null ;
	
	const removeToken = () => {
		localStorage.removeItem('token');
		if(window.location.pathname === '/'){
			window.location.reload();
		}else{
			history.push('/');
		}
		

	}
	return(



			<Hidden smUp implementation="css">

						<Drawer
						    variant="temporary"
						    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						    open={props.mobilebar}
				            onClose={props.handleDrawerToggle}
				            classes={{
			           		   paper: classes.drawerPaper,				       
			                }}
				            ModalProps={{
							           keepMounted: true, // Better open performance on mobile.
				            }}
						     >
						    <IconButton onClick={props.handleDrawerToggle} className={classes.closeMenuButton}>
							    <CloseIcon/>
							</IconButton>
							<Typography variant="h6" color='inherit' className={classes.title}>
								<Link to='/' className="brand-logo" style={{color : '#B0DFE5', fontWeight : 900, fontSize : 25}}>Store</Link>
								<br/>
								{token == null ? 
									<>
										<Link to='/register' className="brand-logo" style={{color : '#B0DFE5', fontWeight : 900, fontSize : 25}}>Signup</Link>
										<br/>
										<Link to='/login' className="brand-logo" style={{color : '#B0DFE5', fontWeight : 900, fontSize : 25}}>Login</Link>
									</>
								:
									<>
										<Typography className="brand-logo" style={{color : '#B0DFE5', fontWeight : 900, fontSize : 25}}>Hi {Name}!</Typography>
									
										<Typography onClick={removeToken} className="brand-logo" style={{color : '#B0DFE5', fontWeight : 900, fontSize : 25, cursor : 'pointer'}}>Logout</Typography>
										
									</>
								}
							</Typography>  
					    </Drawer>

			</Hidden>






		);
}

export default Drawers;