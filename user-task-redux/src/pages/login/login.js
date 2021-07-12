import React, { Component, createRef } from "react";
import bg2 from '../../assets/images/bg-2.png';
import './style.scss'
import { signIn } from '../../services/auth';
import { Link } from "react-router-dom";

class Login extends Component {
	userNameRef;
	passWordRef;

	constructor(props) {
		super(props);
		this.userNameRef = createRef();
		this.passWordRef = createRef();
	}

	onClickLogin() {
		const email = this.userNameRef.current.value;
		const password = this.passWordRef.current.value;
		if (!email || !password) return;
		else {
			signIn(email, password).then(authenticated => {
				if (authenticated) {
					this.props.history.push('/users');
				}
			});
		}
	}

	render() {
		return (
			<div className="img" style={{ backgroundImage: `url(${bg2})`, height: '875px' }}>
				<section className="ftco-section">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-md-6 text-center mb-5">
								<h2 className="heading-section">Login</h2>
							</div>
						</div>
						<div className="row justify-content-center">
							<div className="col-md-6 col-lg-4">
								<div className="login-wrap p-0">
									<h3 className="mb-4 text-center">Have an account?</h3>
									<form action="#" className="signin-form">
										<div className="form-group">
											<input type="text" className="form-control" placeholder="Email" ref={this.userNameRef} required />
										</div>
										<div className="form-group">
											<input id="password-field" type="password" className="form-control" placeholder="Password" ref={this.passWordRef} required />
											<span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password" />
										</div>
										<div className="form-group">
											<button type="button" className="form-control btn btn-primary submit px-3" onClick={() =>
												this.onClickLogin()}>Sign In</button>
										</div>
										<div className="form-group d-md-flex">
											<div className="w-50">
												<label className="checkbox-primary">
													<input style={{ margin: '5px' }} type="checkbox" defaultChecked={false} />
													Remember Me
												</label>
											</div>
											<div className="w-50 text-md-right">
												<a href="#" style={{ color: '#fff' }}>Forgot Password</a>
											</div>
										</div>
									</form>
									<div className="form-group">
											<Link to="/signup" className="form-control btn btn-primary submit px-3">Sign Up</Link>
										</div>
									<p className="w-100 text-center">— Or Sign In With —</p>
									<div className="social d-flex text-center">
										<a href="#" className="px-2 py-2 mr-md-1 rounded"><span className="ion-logo-facebook mr-2" />
											Facebook</a>
										<a href="#" className="px-2 py-2 ml-md-1 rounded"><span className="ion-logo-twitter mr-2" />
											Twitter</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
};

export default Login