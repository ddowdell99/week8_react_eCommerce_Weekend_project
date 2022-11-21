import React, { Component } from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Nav from './componets/Nav'
import Home from './views/Home'
import Login from './views/Login'
import SignUp from './views/SignUp'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      messages: {}
    }
  }
  
  componentDidMount = async () => {
    const res = await fetch('https://fakestoreapi.com/products/{id}')
    const data = await res.json()
    if (data.status==='ok') {
        this.setState({posts: data.data})
    }

}
  logInUser = (user) => {
    this.setState({
      user: user
    })
  };

  logOutUser = () => {
    this.setState({
      user: {}
    })
  };

  render = () => {
    return (
      <Router>
        <div>
          <Nav user={this.state.user} logOutUser={this.logOutUser} />
          {this.state.messages.message?
            <>
                <div className={`alert alert-${this.state.messages.category} alert-dismissible fade show`} role="alert">
                <p>{this.state.messages.message}</p>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={this.removeMessage}></button>
              </div>
            </>
            :
            <>

            </>
          }
          <Routes>

            <Route path='/' element={<Home />}></Route>
            <Route path='/signup' element={<SignUp addMessage={this.addMessage} />}></Route>
            <Route path='/login' element={<Login addMessage={this.addMessage} logInUser={this.logInUser} />}></Route>

          </Routes>
        </div>

      </Router >


    )
  }
}