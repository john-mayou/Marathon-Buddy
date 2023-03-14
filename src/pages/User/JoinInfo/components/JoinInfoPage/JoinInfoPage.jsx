import "./JoinInfoPage.scss";

// components
import Sidebar from "../../../../../layout/Sidebar/Sidebar";
import SectionLabel from "../../../../../components/SectionLabel/SectionLabel";
import GoalCard from "../GoalCard/GoalCard";

// images
import RedTrackPic from "../../../../../assets/images/Track-Close-Up-Red.jpg";
import BlackTrackPic from "../../../../../assets/images/Track-Close-Up-Black.jpg";

//
import { useHistory } from "react-router-dom";

function JoinInfoPage() {
	const history = useHistory();

	const goalOptionsList = [
		{
			image: RedTrackPic,
			imageText: "20M",
			title: "20 Miles Per Week",
			description: "The usual suspects into the universe we go",
		},
		{
			image: BlackTrackPic,
			imageText: "40M",
			title: "40 Miles Per Week",
			description: "The usual suspects into the universe we go",
		},
		{
			image: RedTrackPic,
			imageText: "60M",
			title: "60 Miles Per Week",
			description: "The usual suspects into the universe we go",
		},
		{
			image: BlackTrackPic,
			imageText: "Add",
			title: "Custom Plan",
			description: "The usual suspects into the universe we go",
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
							/>
						);
					})}
				</div>
			</section>
			<button onClick={() => history.push("/join-cohort")}>
				Sign Up
			</button>
		</div>
	);
}

export default JoinInfoPage;
