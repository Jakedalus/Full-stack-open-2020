import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: lightgray;
	padding: 10px;

	nav {
		width: 100%;
	}

	ul {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0;
		margin-right: 0;
		list-style: none;
	}

	h2 button {
		margin-left: 5px;
	}
`;

const InnerNav = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 10%;

	a {
		text-decoration: none;
		color: darkblue;
	}
`;

const Header = ({ user, handleLogout }) => {
	return (
		<StyledDiv>
			<nav>
				<ul>
					<li>
						<h2>
							{user.name} is logged in
							<button onClick={handleLogout}>logout</button>
						</h2>
					</li>
					<InnerNav>
						<Link to='/blogs'>
							<li>blogs</li>
						</Link>
						<Link to='/users'>
							<li>users</li>
						</Link>
					</InnerNav>
				</ul>
			</nav>
		</StyledDiv>
	);
};

export default Header;
