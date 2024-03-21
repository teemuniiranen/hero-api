export const USER_ENTITY_TYPE = "HeroApp::User";
export const HERO_ENTITY_TYPE = "HeroApp::Hero";
export const ACTION_ENTITY_TYPE = "HeroApp::Action";
export const GROUP_ENTITY_TYPE = "HeroApp::Group";
export const REGION_ENTITY_TYPE = "HeroApp::Region";

export const buildActionToGraphQlMap = (accountId: string, apiId: string) => {
  return new Map<string, string>([
    ["AddHero", "Mutation.addHero"],
    ["GetHero", "Query.getTask"],
    ["ListHeroes", "Query.listHeroes"],
    [
      "GetHeroName",
      `arn:aws:appsync:${process.env.AWS_REGION}:${accountId}:apis/${apiId}/types/Hero/fields/name`,
    ],
  ]);
};
