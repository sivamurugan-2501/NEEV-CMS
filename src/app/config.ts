//import { apiConfigs } from './../environments/environment';
//import { environment } from 'src/environments/environment.prod';

const apiBaseURL = (window.location.origin == "http://localhost:4200") ? "http://localhost:8000/cms" : "http://heartcode.co/CMS/public/cms";


export const CONFIGS = {
  "apiBaseURL" : apiBaseURL,
  "apiURLs" : {

    "banner" : {
      "add" : "/banner/add",
      "list" : "/banner/list",
      "delete" : "/banner/delete",
      "edit" : "/banner/edit",
      "get" : "/banner"
   },

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
