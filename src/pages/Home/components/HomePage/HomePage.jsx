import "./HomePage.scss";

import HomeHero from "../HomeHero/HomeHero";
import HomeContent from "../HomeContent/HomeContent";
import HomeFooter from "../HomeFooter/HomeFooter";

function HomePage() {
	return (
		<div>
			<h1>HomePage</h1>
			<HomeHero />
			<HomeContent />
			<HomeFooter />
		</div>
	);
}

export default HomePage;
