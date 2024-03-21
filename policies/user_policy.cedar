permit (
	principal in HeroApp::Group::"User",
	action in [HeroApp::Action::"ListHeroes", HeroApp::Action::"GetHero"],
	resource
);