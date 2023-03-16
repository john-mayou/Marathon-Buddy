import "./HomeFooter.scss";
import SignUpButton from "../../../components/SignUpButton/SignUpButton";
import HappyWoman from "../../../assets/images/Happy-Woman.jpg";

function HomeFooter() {
	return (
		<section className="home-footer">
			<img className="home-footer__image" src={HappyWoman} />
			<article className="home-footer__text-box">
				<h1 className="home-footer__header-primary">
					Ready To Crush Your Goals?
				</h1>
				<SignUpButton />
			</article>
		</section>
	);
}

export default HomeFooter;
