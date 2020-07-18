import React from 'react';
import { Button } from 'reactstrap';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import './product.css';
import Laptop from './static/laptop.jpg';
import axios from 'axios';
import SimpleDialog from './dialog';


const useStyles = makeStyles(( theme ) => ({

	mobilecontainer : {
		marginTop: '20px',
	    display: 'flex',
	    flexWrap: 'wrap',
	    justifyContent: 'flex-start',
	    flex: 1,
	    paddingLeft : '30px'
	     
	},

	mobileitem : {
		display: 'flex',
	    flexDirection: 'column',
	    flexBasis: '20rem',
	    height: '11.8rem',
	    marginRight: '1.5rem',
	    marginBottom: '3rem',
	    borderRadius: '0.2rem',
	    boxShadow: '0 0.1rem 0.3rem rgba(0, 24, 48, 0.2)',
	    cursor: 'pointer',
	    
	},

	mobilethumbnail : {
		display: 'flex',
	    justifyContent: 'center',
	    alignItems: 'center',
	    flex: 1,
	    fontSize: '4.5rem',
	    color: '#fff'
	},

	mobileinfo : {
		flexBasis: '5rem',
	    display: 'flex',
	    flexDirection: 'column',
	    justifyContent: 'center',
	    backgroundColor: '#fff',
	    padding: '0 0.9rem',
	    lineHeight: '1.2'
	},

	mobilename : {
		fontSize: '1.5rem',
	    fontWeight: '600',
	    color: '#465e7b'
	},

	mobilesummary : {
		fontSize: '1.2rem',
	    fontWeight: '400',
	    color: '#666'
	}

})
);
function Product(){

	const classes = useStyles();
	const [items, setItems] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const [name, setName] = React.useState('');

	axios.get('/api-product')
	.then((res) => setItems(res.data))
	.catch((err) => console.log(err))

	const handleOpen = (name) => {
		setOpen(true);
		setName(name);
	} 

	const handleOpenclose = () => {
		setOpen(false);
	}


	return(
		<>
			<Hidden xsDown>
				<div className="vault-items-container">
					{items.map((item, index) => (
					<div className="vault-item password-item" tabIndex="0" key={index}>
						<div className="vault-item-thumbnail">
							<img style={{width : '105px', height : '95px', marginTop : '10px'}} src={`http://localhost:5000/static/${item.path}`} alt="pc" />
						</div>

						<div className="vault-item-info">
							<h3 className="vault-item-name" style={{color : '#B0DFE5'}}>{item.name}</h3>
							<span className="vault-item-summary">${item.price}</span>
						</div>
						<Button style={{background : '#B0DFE5'}} onClick={() => handleOpen(item.name)}>Add To Cart</Button>
						<SimpleDialog open={open} handleOpenclose={handleOpenclose} name={name}/>
					</div>
					))}
					
					

				</div>
			</Hidden>

			{/*Mobile*/}

			<Hidden smUp>
				<div className={classes.mobilecontainer}>
					{items.map((item, index) => (

						<div className={classes.mobileitem} tabindex="0" key={index}>
							<div className={classes.mobilethumbnail}>
								<img style={{width : '75px', height : '65px', marginTop : '10px'}} src={`http://localhost:5000/static/${item.path}`} alt="pc" />
							</div>
							<div className={classes.mobileinfo}>
								<h3 className={classes.mobilename}>{item.name}</h3>
								<p className={classes.mobilesummary}>${item.price}</p>
							</div>
							<Button style={{background : '#B0DFE5'}} onClick={handleOpen}>Add To Cart</Button>
							<SimpleDialog open={open} handleOpenclose={handleOpenclose} name={item}/>
						</div>

					))}
					

				</div>
			</Hidden>
		</>
		);
}

export default Product