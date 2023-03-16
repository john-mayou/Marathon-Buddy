import "./JoinInfoPage.scss";

// components
import SectionLabel from "../../../../components/SectionLabel/SectionLabel";
import GoalCard from "../GoalCard/GoalCard";

// images
import RedTrackPic from "../../../../assets/images/Track-Close-Up-Red.jpg";
import BlackTrackPic from "../../../../assets/images/Track-Close-Up-Black.jpg";

function JoinInfoPage() {
	const goalOptionsList = [
		{
			image: RedTrackPic,
			imageText: "1W",
			title: "Lucky Number 7",
			description:
				"This is just copy, lets figure something else to put in here",
			durationParam: 7,
		},
		{
			image: BlackTrackPic,
			imageText: "2W",
			title: "Build The Habit",
			description:
				"This is just copy, lets figure something else to put in here",
			durationParam: 14,
		},
		{
			image: RedTrackPic,
			imageText: "1M",
			title: "Running To The Bank",
			description:
				"This is just copy, lets figure something else to put in here",
			durationParam: 28,
		},
		{
			image: BlackTrackPic,
			imageText: "2M",
			title: "To The Pro's We Go",
			description:
				"This is just copy, lets figure something else to put in here",
			durationParam: 56,
		},
	];

	return (
		<div>
			<section className="goal-hero">
				<div className="goal-hero__text-box">
					<div className="goal-hero__heading-box">
						<h1 className="goal-hero__heading-primary">
							What's Your Goal?
						</h1>
						<p className="goal-hero__heading-secondary"></p>
					</div>
					<p className="goal-hero__copy-text">
						Pick from our hand crafted templates down below or click
						custom to create your own!
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
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Dolores quaerat reprehenderit deserunt reiciendis quia natus
					omnis excepturi cupiditate veniam. Repellendus illo vel sit,
					unde nisi accusamus neque id, quos, deleniti exercitationem
					odit.
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
		</div>
	);
}

export default JoinInfoPage;
