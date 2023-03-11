import "./LoginTemplate.scss";
import RunningPicture from "../../assets/images/Woman-Running-Away.jpg";

function LoginTemplate({ FormElement }) {
	return (
		<>
			<div className="login-page">
				<section className="login-page__form-box">
					<FormElement />
				</section>
				<section className="login-page__image-box">
					<img
						className="login-page__hero-image"
						src={RunningPicture}
						alt="running photo"
					/>
				</section>
			</div>
		</>
	);
}

export default LoginTemplate;
