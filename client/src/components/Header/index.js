import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-secondary mb-4 py-2 flex-row align-center">
            <div className="container flex-row  justify-center align-center">
                <Link
                    to={`/`}
                    style={{ fontWeight: 700 }}
                    className="text-light"
                >
                    <h1 className="brand">idea<i className="fas fa-lightbulb-on"></i>dump<i className='fas fa-dumpster'></i></h1>
                </Link>{' '}
            </div>
        </header>
    );
};

export default Header;