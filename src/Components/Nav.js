import { Link } from 'react-router-dom';

const Nav = () => {

    return (
        <>  
            <nav className="wrapper">
                <p>Superla-TV </p>
                {/* will be logo */}
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/lists">My Lists</Link></li>
                </ul>
            </nav>
        </>
    )

}

export default Nav;