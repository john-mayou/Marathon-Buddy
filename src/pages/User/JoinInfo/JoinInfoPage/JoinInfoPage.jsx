import "./JoinInfoPage.scss";

// components
import SectionLabel from "../../../../components/SectionLabel/SectionLabel";
import GoalCard from "../GoalCard/GoalCard";
import Sidebar from "../../../../layout/Sidebar/Sidebar";

// images
import BlueTrackPic from "../../../../assets/images/Track-Close-Up-Light-Blue.jpg";
import BlackTrackPic from "../../../../assets/images/Track-Close-Up-Black.jpg";

function JoinInfoPage() {
	const goalOptionsList = [
		{
			image: BlueTrackPic,
			imageText: "1W",
			title: "1 Week Training",
			description:
				"Lucky number 7 what can you say, this is a great place to start.",
			durationParam: 7,
		},
		{
			image: BlackTrackPic,
			imageText: "2W",
			title: "2 Week Training",
			description:
				"Now we're starting to build the habit, legs will just be a tad sore",
			durationParam: 14,
		},
		{
			image: BlueTrackPic,
			imageText: "1M",
			title: "1 Month Training",
			description:
				"Habit complete, let's run all the way to bank with this one",
			durationParam: 28,
		},
		{
			image: BlackTrackPic,
			imageText: "2M",
			title: "2 Month Traning",
			description:
				"Inconsistencies who? We're on the way to finishing first",
			durationParam: 56,
		},
	];

	return (
		<div>
			<Sidebar />
			<main className="join-info-main">
				<section className="goal-hero">
					<div className="goal-hero__text-box">
						<div className="goal-hero__heading-box">
							<h1 className="goal-hero__heading-primary">
								What's Your Goal?
							</h1>
							<p className="goal-hero__heading-secondary"></p>
						</div>
						<p className="goal-hero__copy-text">
							Depending on the time before your race or how hard
							you want to push yourself, we've got options.
						</p>
					</div>
				</section>
				<section className="selection">
					<SectionLabel
						iconColor={"rgb(255, 91, 32)"}
						title={"OUR SERVICES"}
					/>
					<h2 className="selection__list-header">
						Our Most Popular Training Programs
					</h2>
					<p className="selection__description">
						Pick your timeline down below then you can specify which
						days you will be active. You will be able to see the
						start date of the next cohort after you decide your
						length or training. Our most popular training plan is
						one month.
					</p>
					<div className="selection__content-box">
						{goalOptionsList.map((goal, i) => {
							return (
								<GoalCard
									key={i}
									image={goal.image}
									imageText={goal.imageText}
									title={goal.title}
									description={goal.description}
									durationParam={goal.durationParam}
								/>
							);
						})}
					</div>
				</section>
				<section className="container-to-fill-navbar-space"></section>
			</main>
		</div>
	);
}

export default JoinInfoPage;
