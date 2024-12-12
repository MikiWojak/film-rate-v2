import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="flex items-center gap-2.5 h-16 p-4">
            <Link to="/">Film Rate</Link>

            <Link to="login">Login</Link>
        </header>
    );
};

export default Header;
