import React, { Component } from 'react';
import { Navbar, MenuItem, NavItem, NavDropdown, Nav } from 'react-bootstrap';
import { LOGIN } from '../../Redux/actions/index'
import { connect } from 'react-redux';
import './navbar.css'

const mapStateToProps = (state) => {
    return { user: state.user};
  };

  const mapDispatchToProps = dispatch => {
    return {
      LOGIN: userInfo => dispatch(LOGIN(userInfo))
    };
  };


class NavigationBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
        };
        this.logOut = this.logOut.bind(this)
    }
    componentWillMount(){
        console.log(this.props)

       if(localStorage.getItem('auth') === null){
            this.setState({
                loggedIn: false
            })
            console.log("no auth")
        }
        else {

            const userInfo = JSON.parse(localStorage.getItem('auth'))
            console.log(userInfo)
            this.props.LOGIN(userInfo)
            this.setState({
                loggedIn: true
            })
            console.log("yes auth")
        }
    }

    logOut(){
        localStorage.removeItem('auth')
        window.location.reload(true);
    }

    render() {
        console.log(this.props)
        if (this.state.loggedIn === false) {
            return (
            <div>
            <Navbar collapseOnSelect>
            <Navbar.Header>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                <NavItem eventKey={1} href="/">
                    <span className='a-hover'>
                    <i class="fas fa-info-circle"></i>
                    </span>
                </NavItem>
               
                <NavItem eventKey={2} href="/login">
                    <span className='a-hover'>
                    <i class="fas fa-calendar-alt"></i>
                    </span>
                </NavItem>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }
    else {
        console.log(this.props)
        console.log(this.state)
        const email = this.props.user.email
        const username = this.props.user.username

        return(
            <div className="navbar">
            <Navbar collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                <a href="/"><i class="fas fa-headphones"></i> <span>BOBA BOT</span></a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            <Nav pullRight>
                <NavItem eventKey={1} href="/">
                    <span className='a-hover'>HOME</span>
                </NavItem>
          
       <NavDropdown eventKey={3} title={username} id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1} href='/profile'><div><i class="fas fa-user-circle"></i></div> Profile</MenuItem>
                    <MenuItem eventKey={3.2} href="/mypins"><div><i class="fas fa-map-pin"></i></div> My Pins</MenuItem>
                    <MenuItem eventKey={3.3} onClick={this.logOut}><div><i class="fas fa-sign-out-alt"></i></div> Log Out</MenuItem>
      
                </NavDropdown>
    
           
            
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            </div>
         )
    }

console.log(this.props.user)    
}
}

export const Navigation = connect(mapStateToProps, mapDispatchToProps)(NavigationBar);



