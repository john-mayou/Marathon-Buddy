import "./HomeContent.scss";
import ContentSideImageBlackTrack from "../../../../assets/images/Track-Close-Up-Black.jpg";
import SectionLabel from "../../../../components/SectionLabel/SectionLabel";

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
						title={"Title"}
						description={
							"Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eum iste vero, debitis labore cupiditate doloribus voluptates vitae accusantium quasi."
						}
						icon={`<i class="fa-solid fa-house"></i>`}
					/>
					<HomeContentItem
						title={"Title"}
						description={
							"Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eum iste vero, debitis labore cupiditate doloribus voluptates vitae accusantium quasi."
						}
						icon={`<i class="fa-solid fa-house"></i>`}
					/>
					<HomeContentItem
						title={"Title"}
						description={
							"Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eum iste vero, debitis labore cupiditate doloribus voluptates vitae accusantium quasi."
						}
						icon={`<i class="fa-solid fa-house"></i>`}
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
