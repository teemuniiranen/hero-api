process.env.DEBUG = "false";
process.env.AWS_REGION = "eu-north-1";
process.env.COGNITO_USER_POOL_ID = "eu-north-1_5hlzvmgIe";
process.env.COGNITO_CLIENT_ID = "5dlnem8jsrdivs7e2724usinkm";
import { buildActionToGraphQlMap } from "../../src/appsync/authorizer/entity-types";
import {
  mapAuthorizationRequests,
  mapAuthorizationResponse,
  mapCognitoGroupsToParentEntities,
} from "../../src/appsync/authorizer/permissions";
import {
  noGroupsAccessToken,
  userAccessToken,
  userAuthorizationDecisions,
} from "../mock-data";

const actionsMap = buildActionToGraphQlMap(
  "123456789012",
  "her0w3t6pna5tp5reja6h5hvtu"
);

test("map a user group to parent group entity", () => {
  expect(mapCognitoGroupsToParentEntities(userAccessToken)).toEqual([
    {
      entityType: "HeroApp::Group",
      entityId: "User",
    },
  ]);
});

test("mapping returns undefined for missing groups", () => {
  expect(mapCognitoGroupsToParentEntities(noGroupsAccessToken)).toEqual(
    undefined
  );
});

test("map token and actions to authorization request", () => {
  expect(mapAuthorizationRequests(userAccessToken, actionsMap)).toEqual([
    {
      principal: {
        entityType: "HeroApp::User",
        entityId: "eu-north-1_5hlzvmgIe|b89463bf-c061-4945-a17b-4a3d9bea33fa",
      },
      action: {
        actionType: "HeroApp::Action",
        actionId: "AddHero",
      },
    },
    {
      principal: {
        entityType: "HeroApp::User",
        entityId: "eu-north-1_5hlzvmgIe|b89463bf-c061-4945-a17b-4a3d9bea33fa",
      },
      action: {
        actionType: "HeroApp::Action",
        actionId: "GetHero",
      },
    },
    {
      principal: {
        entityType: "HeroApp::User",
        entityId: "eu-north-1_5hlzvmgIe|b89463bf-c061-4945-a17b-4a3d9bea33fa",
      },
      action: {
        actionType: "HeroApp::Action",
        actionId: "ListHeroes",
      },
    },
    {
      principal: {
        entityType: "HeroApp::User",
        entityId: "eu-north-1_5hlzvmgIe|b89463bf-c061-4945-a17b-4a3d9bea33fa",
      },
      action: {
        actionType: "HeroApp::Action",
        actionId: "GetHeroName",
      },
    },
  ]);
});

test("map authorization response to appysync authorizer response", () => {
  expect(
    mapAuthorizationResponse(
      userAccessToken,
      userAuthorizationDecisions,
      actionsMap
    )
  ).toEqual({
    isAuthorized: true,
    deniedFields: [
      "Mutation.addHero",
      "arn:aws:appsync:eu-north-1:123456789012:apis/her0w3t6pna5tp5reja6h5hvtu/types/Hero/fields/name",
    ],
    resolverContext: {
      sub: "b89463bf-c061-4945-a17b-4a3d9bea33fa",
    },
  });
});
