permit (
	principal in HeroApp::Group::"Admin",
	action in [
		HeroApp::Action::"AddHero",
		HeroApp::Action::"ListHeroes",
		HeroApp::Action::"GetHero",
		HeroApp::Action::"GetHeroName"
	],
	resource
);