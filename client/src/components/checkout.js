import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Shipping from './static/shipping.png';
import {motion} from 'framer-motion';

const useStyles = makeStyles((theme) => ({
	 mainbox : {
	  margin : 'auto',
	  width : '100%',
	  height : '600px',
	},
	mobilebox : {
	  margin : 'auto',
	  width : '100%',
	  height : '560px',
	  padding : '240px 70px'

	},
	

})
);


function Checkout(props){
	const classes = useStyles();
	document.body.style = 'background: #B0DFE5';
	
	const changecolorin = (e) => {
		e.target.style.color = '#B0DFE5';
	}

	const changecolorout = (e) => {
		e.target.style.color = 'white';
	}

	const home = () => {
		window.location.href = 'https://laptopng.herokuapp.com';
	}
	return(
		<>
		 <Hidden xsDown>
			<div className={classes.mainbox} >
		    	<motion.img
		    	animate={{x : 400}}
		    	transition={{
		    		duration : 1.5,
		    		loop : Infinity,
		    		repeatDelay: 3
		    	}}
		    	src={Shipping} 
		    	alt='Shipped' 
		    	style={{position : 'absolute', top : '40%', left : '25%'}}
		    	/>
		        <br/>
		        <br/>
		        
		    	<p style={{fontSize : '34px', color : 'white', position : 'absolute', top : '45%', left : '26%', paddingRight : '150px', lineHeight : '1.4'}}>Order #{props.match.params.id} has been shipped <span style={{textDecoration : 'underline', cursor : 'pointer'}} onMouseOver={changecolorin} onMouseLeave={changecolorout} onClick={home}>LaptopNg</span></p>
		    </div>
		  </Hidden>

		  <Hidden smUp>

		  	<div className={classes.mobilebox}>
		    	<motion.img 
		    	animate={{x : 100}}
		    	transition={{
		    		duration : 1.5,
		    		loop : Infinity,
		    		repeatDelay: 3
		    	}}
		    	src={Shipping} 
		    	alt='Shipped' 
		    	/>
		    	<br/>
		    	<br/>
		        <br/>

		    	<p style={{fontSize : '25px', color : 'white', lineHeight : '0.9'}}>Order #{props.match.params.id} has been shipped <span style={{textDecoration : 'underline', cursor : 'pointer'}} onClick={home}>LaptopNg</span></p>
		    </div>
		  </Hidden>
		 </>
		);
}

export default Checkout;
