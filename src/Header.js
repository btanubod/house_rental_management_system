import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

function Header(){

    const[{interested, user}, dispatch] = useStateValue();

     const handleAuthenticaton = () => {
        if (user) {
            signOut(auth);
        }
     }

    return(
        <div className="header">
            <Link to="/">
                <img className="header_logo"
                    src="https://pngimg.com/uploads/house/house_PNG1.png"
                    alt=""
                />
            </Link>

                    <div className='header_search'>
                        <input className='header_search_input'
                        type='text' />
                        <SearchIcon className='header_search_icon' />
                    </div>

            <div className='header_nav'>

                <Link to={!user && '/signin'}>
                        <div onClick={handleAuthenticaton} className='header_nav_opt'>
                            <span className='opt_line_one'>
                                Hello {!user ? 'Guest' : user.email}
                            </span>
                            <span className='opt_line_two'>
                                {user ? 'Sign Out' : 'Sign In'}
                            </span>
                        </div>
                </Link>

                <Link to="/viewinterested">
                        <div className='header_nav_opt'>
                            <span className='opt_line_two'>
                                Interested Properties
                            </span>
                            <span className='opt_line_two'>
                                {interested.length}
                            </span>
                        </div>
                </Link>

                <Link to='/addproperty'>
                    <div className='header_nav_opt'>
                        <span className='opt_line_two'>
                            Add
                        </span>
                        <span className='opt_line_two'>
                            Property
                        </span>
                    </div>
                </Link>

                <Link to="/aboutus">
                        <div className='header_nav_opt'>
                            <span className='opt_line_two'>
                                About
                            </span>
                            <span className='opt_line_two'>
                                US
                            </span>
                        </div>
                </Link>
            </div>
        </div>
    );
}

export default Header;