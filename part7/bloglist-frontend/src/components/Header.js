import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, handleLogout }) => {
	return (
		<div>
			<nav>
				<ul>
					<li>
						<h2>
							{user.name} is logged in
							<button onClick={handleLogout}>logout</button>
						</h2>
					</li>
					<Link to='/blogs'>
						<li>blogs</li>
					</Link>
					<Link to='/users'>
						<li>users</li>
					</Link>
				</ul>
			</nav>
		</div>
	);
};

export default Header;
