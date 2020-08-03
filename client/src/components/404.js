import React from 'react'
import './404.css';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
	err : {
	    color: '#ffffff',
	    fontFamily: '14px/22px "Lato", Arial, sans-serif',
	    fontSize: '11rem',
	    position: 'absolute',
	    left: '10%',
	    top: '41%'
	},

	far : {
	  position: 'absolute',
	  left: '32%',
	  top: '33%',
	  
	},

	err2 : {
	    color: '#ffffff',
	    fontFamily: '14px/22px "Lato", Arial, sans-serif',
	    fontSize: '11rem',
	    position: 'absolute',
	    left: '64%',
	    top: '41%',
	  }
})
);

function Page404(){
	const classes = useStyles();
	return(
		<>
		 <Hidden xsDown>
			<div className="mainbox">
		    	<div className="err">
		    		4
		    	</div>
		    	<i className="far fa-question-circle fa-spin"></i>
		    	<div className="err2">4</div>

		    </div>
		  </Hidden>

		  <Hidden smUp>

		  	<div className="mainbox">
		    	<div className={classes.err}>
		    		4
		    	</div>
		    	<div className={classes.far}><i className="far fa-question-circle fa-spin"></i></div>
		    	<div className={classes.err2}>4</div>

		    </div>
		  </Hidden>
		 </>
		);
}

export default Page404;