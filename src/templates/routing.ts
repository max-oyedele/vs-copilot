export const routing = `
const reactRouterConfig = [
   {
    "_pathPrefix": "",
    "component": [Function],
    "exact": true,
    "path": "/authenticate-popup",
    "position": "MIDDLE",
  },
  {
    "_pathPrefix": "",
    "component": [Function],
    "exact": true,
    "path": "/callback",
    "position": "MIDDLE",
  },
  {
    "_pathPrefix": "",
    "component": [Function],
    "exact": true,
    "path": "/reset-password",
    "position": "MIDDLE",
  },
  {
    "_pathPrefix": "",
    "component": [Function],
    "exact": false,
    "name": "rootSlash",
    "path": "/",
    "position": "MIDDLE",
    "routes": [
      {
        "_pathPrefix": "/",
        "component": [Function],
        "exact": false,
        "path": "/",
        "position": "MIDDLE",
      },
      {
        "_pathPrefix": "/",
        "component": [Function],
        "exact": true,
        "path": "/:orgName/dashboard",
        "position": "MIDDLE",
      },
      {
        "_pathPrefix": "/",
        "component": [Function],
        "exact": true,
        "path": "/:orgName/invitation",
        "position": "MIDDLE",
      },
      {
        "_pathPrefix": "/",
        "component": [Function],
        "exact": false,
        "path": "/:orgName/members",
        "position": "MIDDLE",
      },
      {
        "_pathPrefix": "/",
        "component": [Function],
        "exact": true,
        "path": "/:orgName/registries",
        "position": "MIDDLE",
      },
      {
        "_pathPrefix": "/",
        "component": [Function],
        "exact": true,
        "path": "/:orgName/teams",
        "position": "MIDDLE",
      },
      {
        "_pathPrefix": "/",
        "component": [Function],
        "exact": false,
        "path": "/:orgName/teams/view/:teamName",
        "position": "MIDDLE",
      },
      {
        "_pathPrefix": "/",
        "component": [Function],
        "exact": false,
        "path": "/:orgName/usermenu/account",
        "position": "MIDDLE",
        "routes": [
          {
            "_pathPrefix": "/",
            "component": [Function],
            "exact": false,
            "path": "/:orgName/usermenu/account/",
            "position": "MIDDLE",
          },
        ],
      },
      {
        "_pathPrefix": "/",
        "component": [Function],
        "exact": true,
        "path": "/:orgName/usermenu/account-settings",
        "position": "MIDDLE",
      },
      {
        "_pathPrefix": "/",
        "component": [Function],
        "exact": true,
        "path": "/:orgName/usermenu/logout",
        "position": "MIDDLE",
      },
      {
        "_pathPrefix": "/",
        "component": [Function],
        "exact": true,
        "path": "/:orgName/usermenu/profile",
        "position": "MIDDLE",
      },
    ],
  },
]
`;
