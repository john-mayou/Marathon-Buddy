import "./HomeHero.scss";
import SignUpButton from "../../../components/SignUpButton/SignUpButton";

function HomeHero() {
	return (
		<section className="home-hero">
			<div className="home-hero__text-box">
				<div className="home-hero__heading-box">
					<h1 className="home-hero__heading-primary">Goals</h1>
					<p className="home-hero__heading-secondary">FOCUS ON</p>
				</div>
				<p className="home-hero__copy-text">
					Shatter daily insconsistencies by joining a group of like
					minded runners all working toward the same goal
				</p>
				<SignUpButton />
				{/* <StravaButton /> */}
			</div>
		</section>
	);
}

export default HomeHero;
