/**
*
* SignIn
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

import LeftIcon from 'react-icons/lib/fa/chevron-left';
import RightIcon from 'react-icons/lib/fa/chevron-right';

export default class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password: "",
      notificationTwo:"",
      open: this.props.open
    }
  }

  handleEmail = (event) => {
    this.setState({
      email:event.target.value
    })
  }
  handlePassword = (event) => {
    this.setState({
      password:event.target.value
    })
  }

  enterKey = (event) => {
    var key = event.keyCode;

    if (key === 13) {
      this.signIn();
    }
  }

  signIn =() => {
    let data = new FormData;
    let _this = this;
    data.append('email', this.state.email);
    data.append('password', this.state.password);

    fetch('http://localhost:8000/api/signIn', {
      method:'Post',
      body:data
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        if(json.error) {
          _this.setState({
            notificationTwo: json.error
          })
        }
        else {
          _this.setState({
            notificationTwo: json.success
          })
          console.log(json.token);
          sessionStorage.setItem('token', json.token);
          sessionStorage.setItem('user', JSON.stringify(json.user));
          setTimeout(function(){
            let user = JSON.parse(sessionStorage.getItem('user'));
            let url = '/Profile/' + user.id;
            _this.context.router.history.push(url);
          }, 500)
        }
      }.bind(this))
  }


    render() {
      if(this.props.open === true)
      {
      return (
        <div>
          <div className="signInFullContainer">
              <div className="signInUnderlay" onClick={this.props.onClose}>
              </div>
            <div className="signInContainer">
              <div className="signInInput">
                <h3>Sign in to Job Weasel</h3>
                <input type="text" className="emailSignIn" value={this.state.email} onChange={this.handleEmail} placeholder="E-mail"/>

                <input type="password" className="passwordSignIn" value={this.state.password} onKeyDown={this.enterKey} onChange={this.handlePassword} placeholder="Password"/>
                <input type="submit" className="signInButton button" placeholder="Sign-In" onClick={this.signIn} />
                <p className="submitNote">{this.state.notificationTwo}</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (<div className="renuiDialogOverlayHidden"></div>
      );
  }
}
}

SignIn.contextTypes = {
  router: React.PropTypes.object
};
