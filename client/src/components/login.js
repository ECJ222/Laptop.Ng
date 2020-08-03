import React from 'react'
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom';
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

function Login(){
	const history = useHistory();
	const classes = useStyles();
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [userExist, setuserExist] = React.useState(false);
	const [response, setResponse] = React.useState('');
		
	const onSubmitform = async (e) => {
		e.preventDefault();
		await axios.post('/api/login', {
			//data
			email : email,
			password : password
		})
		.then((res) => {
			console.log(res.data)
			if (res.data !== null && res.data !== 'User not exist' && res.data !== 'Password Invalid'){
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('name', res.data.name);
				localStorage.setItem('email', res.data.email);
				//redirects to home from here
				if(localStorage.getItem('token') !== undefined && localStorage.getItem('name') !== undefined && localStorage.getItem('email') !== undefined  ){
					setTimeout( () => {
						history.push('/');
					}, 1000)
				}
				
				
			}
			else {
				setuserExist(true);
				setResponse(`${res.data}`);
				localStorage.setItem('email', email);
			}

		})
		.catch((err) => console.log(err));
		

	}

	const Emailchange = (e) => {
		setEmail(e.target.value)
	}

	const Passwordchange = (e) => {
		setPassword(e.target.value)
	}
	
	
	return(
			<div className="container" style={{marginTop : '6%'}}>
				<div className="form-container sign-in-container">
					<form onSubmit={onSubmitform}>
						<h1 style={{color : '#B0DFE5'}}>Sign in</h1>
						<div className="social-container">
							<a href="http://localhost:5000/auth/google"><img className={classes.social} src={google} alt="google"/></a>
						</div>
						<span style={{color : '#B0DFE5'}}>or use your account</span>
						<input type="email" placeholder="Email" onChange={Emailchange} value={email} style= { response == 'User not exist' ? {borderBottom : '1px solid red'} : {}}/>
						<input type="password" placeholder="Password" onChange={Passwordchange} value={password} style={ response == 'Password Invalid' ? {borderBottom : '1px solid red'} : {}}/>
						<Link to="/reset-password" style={{color : '#B0DFE5'}}>Forgot your password?</Link>
						<br/>
						{ userExist ? <> <span style={{color : '#B0DFE5'}}>Invalid Credentials</span>
						<br /> </> : <span> </span> }
						<Button style={{background : '#B0DFE5'}}>Sign In</Button>
					</form>
				</div>
			</div>
		);
}

export default Login;