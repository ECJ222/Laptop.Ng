import React from 'react';
import { Button } from 'reactstrap';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import './product.css';
import Laptop from './static/laptop.jpg';
import axios from 'axios';
import {Link} from 'react-router-dom';
import SimpleDialog from './dialog';
import {PuffLoader} from "react-spinners";
import ScrollCarousel from './carousel/carousel'

if(window.location.search !== "" && window.location.pathname === "/"){
		let search = new URLSearchParams(window.location.search);
		let name = search.get('n_e');
		let token = search.get('t_n');
		let email = search.get('e_l');
		//
		localStorage.setItem('name', name);
		localStorage.setItem('token', token);
		localStorage.setItem('email', email);
}


const useStyles = makeStyles(( theme ) => ({

	mobilecontainer : {
		marginTop: '5%',
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
	    animation: 'fadeIn .5s ease-in'
	    
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
	},

	button : {
		background : '#B0DFE5',
		marginRight : '50%',
		marginLeft : 'auto',
  		marginTop : 'auto',

	},
	
	mobilebutton : {
		background : '#B0DFE5',
		marginLeft : '26%'
		
	}

})
);

function Product(){

	const classes = useStyles();
	const [items, setItems] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const [name, setName] = React.useState('');
	const user = localStorage.getItem('name') || null;
	const email = localStorage.getItem('email') || null;
	const [list, setList] = React.useState(4);
	const [mobilelist, setMobilelist] = React.useState(4);
	
	React.useEffect(() => {
			axios.get('/api-product')
			.then((res) => setItems(res.data))
			.catch((err) => console.log(err));
	
	});
	
	const handleOpen = async (name, price, image, path) => {
		setOpen(true);
		setName(name);
	
		await axios.post('http://localhost:5000/api-cart', {
			email : email,
			user : user,
			name : name,
			price : price,
			data : image.data,
			contentType : image.contentType,
			path : path
		})
		.then(() => console.log("Ok"))
		.catch((err) => console.log(err))
	} 

	const handleOpenclose = () => {
		setOpen(false);
	}

	const Showlistitem = () => {
		setList(list + 4);
	}

	const MobileShowlistitem = () => {
		setMobilelist(mobilelist + 4);
	}
	

	return(
		<>
			<Hidden xsDown>
				
				{items.length < 1
				 ? 
					<div style={{display: "flex", justifyContent : "center", alignItems : "center", marginTop : "10%", zIndex : 1, animation: 'fadeOut .5s ease-out'}}>
				      <PuffLoader loading={true} color={"#B0DFE5"} />

			      	</div>
		      	 :
					<>		      	 
		      	 	<div style={{marginTop : '55px',  marginBottom : '120px'}}>
						<ScrollCarousel />
					</div>
					<div className="vault-items-container">
						{items.slice(0, list).map((item, index) => (
						<div className="vault-item password-item" tabIndex="0" key={index}>
							<div className="vault-item-thumbnail">
								<img style={{width : '105px', height : '95px', marginTop : '10px'}} src={`http://localhost:5000/static/${item.path}`} alt="pc" />
							</div>

							<div className="vault-item-info">
								<h3 className="vault-item-name" style={{color : '#B0DFE5'}}>{item.name}</h3>
								<span className="vault-item-summary">${item.price.toFixed(2)}</span>
							</div>
							{user !== null && email !== null ? <> <Button style={{background : '#B0DFE5'}} onClick={() => handleOpen(item.name, item.price, item.image, item.path)}>Add To Cart</Button> </> : <> <Link to='/login'> <Button style={{background : '#B0DFE5', width : '100%'}}>Add To Cart</Button></Link> </>}
							<SimpleDialog open={open} handleOpenclose={handleOpenclose} name={name}/>
						</div>
						))}
						<br />
						{items.length >= list 
							?
							<>
								<Button className={classes.button} onClick={Showlistitem}>Load more</Button>
							</>
							:
							<>
							</>
						}
						
						

					</div>
					</>
			    }
			</Hidden>

			{/*Mobile*/}

			<Hidden smUp>
			 
			 {items.length < 1
				? 
					<div style={{display: "flex", justifyContent : "center", alignItems : "center", marginTop : "60%", zIndex : 1, animation: 'fadeOut .5s ease-out'}}>
				      <PuffLoader loading={true} color={"#B0DFE5"} />
			      	</div>
		      	:
		      	    <>
		      		<div style={{marginTop : '15%'}}>
							<ScrollCarousel />
					 </div>
					<div className={classes.mobilecontainer}>
						{items.slice(0, mobilelist).map((item, index) => (

							<div className={classes.mobileitem} tabIndex="0" key={index}>
								<div className={classes.mobilethumbnail}>
									<img style={{width : '75px', height : '65px', marginTop : '10px'}} src={`http://localhost:5000/static/${item.path}`} alt="pc" />
								</div>
								<div className={classes.mobileinfo}>
									<h3 className={classes.mobilename}>{item.name}</h3>
									<p className={classes.mobilesummary}>${item.price.toFixed(2)}</p>
								</div>
								{user !== null && email !== null ? <> <Button style={{background : '#B0DFE5'}} onClick={() => handleOpen(item.name, item.price, item.image, item.path)}>Add To Cart</Button> </> : <> <Link to='/login'> <Button style={{background : '#B0DFE5', width : '100%'}}>Add To Cart</Button></Link> </>}
								<SimpleDialog open={open} handleOpenclose={handleOpenclose} name={name}/>
							</div>

						))}

						{items.length >= mobilelist 
							?
							<>
								<Button className={classes.mobilebutton} onClick={MobileShowlistitem}>Load more</Button>
							</>
							:
							<>
							</>
						}
						

					</div>
					</>
			 }
			</Hidden>
		</>
		);
}

export default Product;