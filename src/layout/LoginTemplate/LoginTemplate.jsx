import "./LoginTemplate.scss";
import RunningPicture from "../../assets/images/Woman-Running-Blue.jpg";

function LoginTemplate({ FormElement }) {
	return (
		<>
			<div className="login-page">
				<section className="login-page__form-box">
					<FormElement />
				</section>
				<section className="login-page__image-box">
					<img src={RunningPicture} alt="" />
				</section>
			</div>
		</>
	);
}

export default LoginTemplate;
