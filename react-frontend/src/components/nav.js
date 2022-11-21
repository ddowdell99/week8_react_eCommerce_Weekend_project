import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends Component {

  getTotal = (cart) => {
    let total = 0
    for (let item of cart) {
      total = total + parseFloat(item.price)
    }
    return total.toFixed(2)
  }

  render = ( ) => {
    return (
      <nav className="navbar navbar-expand-lg bg-dark navbar-container">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Padawans Store</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">&nbsp;&nbsp;Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  {this.props.cart.length} | {this.getTotal(this.props.cart)}</Link>
              </li>
              {/* 
              {this.props.user.username? */}
              <>
                <li className="nav-item">
                  <Link className="nav-link">&nbsp;&nbsp;Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={() => this.props.logOutUser()}>Log Out</Link>
                </li>
                <li className="nav-item">
                  {/* <p className="nav-link">Hello, {this.props.user.username}!</p> */}
                </li>

              </> : <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Log In</Link>
                </li>

              </>

            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success searchButton" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    )
  }
}