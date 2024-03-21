import { BatchIsAuthorizedCommandOutput } from "@aws-sdk/client-verifiedpermissions";
import { CognitoAccessTokenPayload } from "aws-jwt-verify/jwt-model";

export const userAccessToken: CognitoAccessTokenPayload = {
  sub: "b89463bf-c061-4945-a17b-4a3d9bea33fa",
  "cognito:groups": ["User"],
  iss: "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_5hlzvmgIe",
  client_id: "5dlnem8jsrdivs7e2724usinkm",
  origin_jti: "cf0ec9f6-e990-4dce-a864-29131082d927",
  event_id: "7b8c5882-e6fd-4706-8fbc-334b6b1581ab",
  token_use: "access",
  scope: "aws.cognito.signin.user.admin",
  auth_time: 1710426106,
  exp: 1710429706,
  iat: 1710426106,
  jti: "744da750-af1f-4b62-b360-41abaf5936d3",
  username: "hero-user",
  version: 1,
};

export const noGroupsAccessToken: CognitoAccessTokenPayload = {
  sub: "b89463bf-c061-4945-a17b-4a3d9bea33fa",
  iss: "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_5hlzvmgIe",
  client_id: "5dlnem8jsrdivs7e2724usinkm",
  origin_jti: "cf0ec9f6-e990-4dce-a864-29131082d927",
  event_id: "7b8c5882-e6fd-4706-8fbc-334b6b1581ab",
  token_use: "access",
  scope: "aws.cognito.signin.user.admin",
  auth_time: 1710426106,
  exp: 1710429706,
  iat: 1710426106,
  jti: "744da750-af1f-4b62-b360-41abaf5936d3",
  username: "hero-user",
  version: 1,
};

export const userAuthorizationDecisions: BatchIsAuthorizedCommandOutput = {
  $metadata: {
    httpStatusCode: 200,
    requestId: "303ed6c9-790e-462e-970a-c8387e02e2dd",
    attempts: 1,
    totalRetryDelay: 0,
  },
  results: [
    {
      decision: "DENY",
      determiningPolicies: [],
      errors: [],
      request: {
        action: {
          actionType: "HeroApp::Action",
          actionId: "AddHero",
        },
        principal: {
          entityType: "HeroApp::User",
          entityId: "eu-north-1_5hlzvmgIe|b89463bf-c061-4945-a17b-4a3d9bea33fa",
        },
      },
    },
    {
      decision: "ALLOW",
      determiningPolicies: [
        {
          policyId: "5jumbAvZ8T7Rnnf85PuYmp",
        },
      ],
      errors: [],
      request: {
        action: {
          actionType: "HeroApp::Action",
          actionId: "GetHero",
        },
        principal: {
          entityType: "HeroApp::User",
          entityId: "eu-north-1_5hlzvmgIe|b89463bf-c061-4945-a17b-4a3d9bea33fa",
        },
      },
    },
    {
      decision: "ALLOW",
      determiningPolicies: [
        {
          policyId: "5jumbAvZ8T7Rnnf85PuYmp",
        },
      ],
      errors: [],
      request: {
        action: {
          actionType: "HeroApp::Action",
          actionId: "ListHeroes",
        },
        principal: {
          entityType: "HeroApp::User",
          entityId: "eu-north-1_5hlzvmgIe|b89463bf-c061-4945-a17b-4a3d9bea33fa",
        },
      },
    },
    {
      decision: "DENY",
      determiningPolicies: [],
      errors: [],
      request: {
        action: {
          actionType: "HeroApp::Action",
          actionId: "GetHeroName",
        },
        principal: {
          entityType: "HeroApp::User",
          entityId: "eu-north-1_5hlzvmgIe|b89463bf-c061-4945-a17b-4a3d9bea33fa",
        },
      },
    },
  ],
};
