import "./Header.scss";

function Header({ text }) {
	return (
		<header className="header">
			<h1 className="header__title">{text}</h1>
		</header>
	);
}

export default Header;
