import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Nav() {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);

	return (
		<div className="nav">
			<Link to="/home">
				<h2 className="nav-title">Prime Solo Project</h2>
			</Link>
			<div>
				{/* If no user is logged in, show these links */}
				{!user.id && (
					// If there's no user, show login/registration links
					<Link className="navLink" to="/login">
						Login / Register
					</Link>
				)}

				{/* If a user is logged in, show these links */}
				{user.id && (
					<>
						<Link className="navLink" to="/user">
							Home
						</Link>

						<Link className="navLink" to="/info">
							Info Page
						</Link>
					</>
				)}

				<Link className="navLink" to="/about">
					About
				</Link>
				<button
					// This button shows up in multiple locations and is styled differently
					// because it's styled differently depending on where it is used, the className
					// is passed to it from it's parents through React props
					onClick={() => dispatch({ type: "LOGOUT" })}
				>
					Log Out
				</button>
			</div>
		</div>
	);
}

export default Nav;
