// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const apiConfigs = {
  "apiBaseURL" : "http://localhost:8000/cms",
  "apiURLs" : {
    "video" : {
       "add" : "/video/add",
       "list" : "/video/list"
    },
    "product" : {
      "add" : "/product/add",
      "list" : "/product/list"
   },
    "authenticate" : "/authenticate",
    "configs" : {
        "language" : "/config/languages"
    }
    
  }
};