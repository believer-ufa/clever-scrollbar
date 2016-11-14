SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "github:": "jspm_packages/github/",
    "CleverScrollbar/": "src/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.17"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "CleverScrollbar": {
      "main": "CleverScrollbar.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        },
        "*.css": {
          "loader": "css"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "css": "github:systemjs/plugin-css@0.1.32"
  },
  packages: {}
});
