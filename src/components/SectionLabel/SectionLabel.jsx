import "./SectionLabel.scss";

function SectionLabel({ iconColor, title }) {
	return (
		<p className="section-label">
			<i
				className="fa-solid fa-circle"
				style={{ color: `${iconColor}` }}
			></i>
			{title}
		</p>
	);
}

export default SectionLabel;
