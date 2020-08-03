import React from 'react';
import { Button } from 'reactstrap';
import google from './static/brands-and-logotypes.png';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	
	social : {
			width : '20px',
			height : '20px'
	}
	
})
);

function Register(){
	const history = useHistory();
	const classes = useStyles();
	const [userExist, setuserExist] = React.useState(false);
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const onSubmitform = async (e) => {
		e.preventDefault();
		await axios.post('/api/register', {
			//data
			name : name,
			email : email,
			password : password
		})
		.then((res) => {
			console.log(res.data)
			if (res.data !== null && res.data !== 'User already exists'){
				localStorage.setItem('token', res.data);
				localStorage.setItem('name', name);
				localStorage.setItem('email', email);
				//redirects to home from here
				setTimeout( () => {
					history.push('/');
				}, 1000)
				
			}
			else {
				setuserExist(true);
			}

		})
		.catch((err) => console.log(err));
		

	}

	const Namechange = (e) => {
		setName(e.target.value)
	}

	const Emailchange = (e) => {
		setEmail(e.target.value)
	}

	const Passwordchange = (e) => {
		setPassword(e.target.value)
	}



	return(
			
			<div className="container" id="container" style={{marginTop : '6%'}}>
				<div className="form-container sign-up-container">
					<form onSubmit={onSubmitform}>
						<h1 style={{color : '#B0DFE5'}}>Create Account</h1>
						<div className="social-container">
							<a href="https://laptopng.herokuapp.com/auth/google"><img  className={classes.social} src={google} alt="google"/></a>
						</div>
						<span style={{color : '#B0DFE5'}}>or use your email for registration</span>
						<input type="text" placeholder="Name" onChange={Namechange} value={name}/>
						<input type="email" placeholder="Email" onChange={Emailchange} value={email}/>
						<input type="password" placeholder="Password" onChange={Passwordchange} value={password}/>
						{ userExist ? <> <span style={{color : '#B0DFE5'}}>User already exist</span>
						<br /> </> : <span> </span> }

						<Button style={{background : '#B0DFE5'}}>Sign Up</Button>
					</form>
				</div>
			</div>

		);
}

export default Register;
