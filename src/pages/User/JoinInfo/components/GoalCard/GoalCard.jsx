import "./GoalCard.scss";
import { useHistory } from "react-router-dom";

function GoalCard({ image, imageText, title, description, durationParam }) {
	const history = useHistory();

	return (
		<div
			className="goal-card"
			onClick={() => history.push(`/join-cohort/${durationParam}`)}
		>
			<div className="goal-card__image-container">
				<span className="goal-card__image-text-container">
					<span className="goal-card__image-text">{imageText}</span>
				</span>
				<img className="goal-card__image" src={image} />
			</div>
			<article className="goal-card__text-box">
				<h2 className="goal-card__title">{title}</h2>
				<div className="goal-card__divider"></div>
				<p className="goal-card__description">{description}</p>
			</article>
		</div>
	);
}

export default GoalCard;
