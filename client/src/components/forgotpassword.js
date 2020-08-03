import React from 'react'
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Forgotpassword(){
	const history = useHistory();
	const email = localStorage.getItem('email');
	const [password, setPassword] = React.useState('');
	const [Confirmpassword, setConfirmPassword] = React.useState('');
	const [notuser, setNotuser] = React.useState(false);

	const Passwordchange = (e) => {
		setPassword(e.target.value)
	}

	const ConfirmPasswordchange = (e) => {
		setConfirmPassword(e.target.value);
	
	}

	
	

	const onSubmitform = async (e) => {
		e.preventDefault();
		if (password === Confirmpassword){
			
			await axios.post('/api/resetpassword', {
				//data
				email : email,
				password : password
			})
			.then((res) => {
				if (res.data !== null && res.data !== 'User not exists'){
					console.log(res.data)
					history.push('/login');
				}else{
					setNotuser(true);
				}
			})
			.catch((err) => console.log(err));

		}
		
	}


	return(
			<div className="container">
				<div className="form-container sign-in-container">
					<form onSubmit={onSubmitform}>
						<h1 style={{color : '#B0DFE5'}}>Reset Password</h1>
						<input type="password" placeholder="Password" onChange={Passwordchange} value={password}/>

						<input type="password" placeholder="Confirm Password" onChange={ConfirmPasswordchange} value={Confirmpassword}/>
						<br/>
						{password !== Confirmpassword && Confirmpassword !== '' ? <><span style={{color : 'red'}}>Password is not the same</span> <br/> </> : <><span></span></>}
						{notuser ? <><span style={{color : 'red'}}>This user doesn't exist</span> <br/> </> : <><span></span></>}
						<Button style={{background : '#B0DFE5'}}>Reset Password</Button>
					</form>
				</div>
			</div>
		);
}

export default Forgotpassword;