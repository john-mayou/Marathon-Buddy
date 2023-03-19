import "./GoalCard.scss";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function GoalCard({ image, imageText, title, description, durationParam }) {
	const history = useHistory();
	const user = useSelector((store) => store.user);

	return (
		<div
			className="goal-card"
			onClick={() => {
				if (user.strava_connected && !user.is_active) {
					history.push(`/join-cohort/${durationParam}`);
				} else if (user.is_active) {
					alert(
						"You can join a another cohort once your current one is complete"
					);
				} else if (!user.strava_connected) {
					alert(
						"Please connect to Strava under the Connect Apps page"
					);
				} else {
					alert(
						"Something went wrong, please give us some time to figure it out"
					);
				}
			}}
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
