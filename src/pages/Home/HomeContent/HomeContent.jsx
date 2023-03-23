import "./HomeContent.scss";
import ContentSideImageBlackTrack from "../../../assets/images/Track-Close-Up-Black.jpg";
import SectionLabel from "../../../components/SectionLabel/SectionLabel";

function HomeContent() {
	return (
		<section className="home-content">
			<img
				className="home-content__image"
				src={ContentSideImageBlackTrack}
			/>
			<article className="home-content__text-box">
				<SectionLabel
					iconColor={"rgb(255, 91, 32)"}
					title={"HOW IT WORKS"}
					className="home-content__section-label"
				/>
				<h2 className="home-content__list-header">
					Our approach to training
				</h2>
				<ul className="home-content__list">
					<HomeContentItem
						title={"Community"}
						description={
							"Joining a cohort of runners that are all working towards their goals will fuel you with fire to crush your own"
						}
						icon={`<i class="fa-solid fa-user-group"></i>`}
					/>
					<HomeContentItem
						title={"Stake"}
						description={
							"For each day you run your desired mileage, you keep your stake. Do well, and earn you entire stake back while achieving your athletic goals"
						}
						icon={`<i class="fa-solid fa-handshake-simple"></i>`}
					/>
					<HomeContentItem
						title={"Win"}
						description={
							"By using social dynamics and loss aversion as catalysts to improving your training, you give yourself the advantage come race day"
						}
						icon={`<i class="fa-solid fa-ribbon"></i>`}
					/>
				</ul>
			</article>
		</section>
	);
}

function HomeContentItem({ title, description, icon }) {
	return (
		<li className="home-content-item">
			<div
				className="home-content-item__icon-box"
				dangerouslySetInnerHTML={{ __html: icon }}
			></div>
			<div className="home-content-item__text-box">
				<h4 className="home-content-item__title">{title}</h4>
				<p className="home-content-item__description">{description}</p>
			</div>
		</li>
	);
}

export default HomeContent;
