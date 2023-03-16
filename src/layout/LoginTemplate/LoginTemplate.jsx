import "./LoginTemplate.scss";
import RunningPicture from "../../assets/images/Woman-Running-Away.jpg";

function LoginTemplate({ FormElement, showVerifyEmail }) {
	return (
		<>
			<div className="login-layout">
				<section className="login-layout__form-box">
					<FormElement showVerifyEmail={showVerifyEmail} />
				</section>
				<section className="login-layout__image-box">
					<img
						className="login-layout__hero-image"
						src={RunningPicture}
						alt="running photo"
					/>
				</section>
			</div>
		</>
	);
}

export default LoginTemplate;
