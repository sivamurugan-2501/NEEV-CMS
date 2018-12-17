//import { apiConfigs } from './../environments/environment';
//import { environment } from 'src/environments/environment.prod';

export const CONFIGS = {
  "apiBaseURL" : "http://heartcode.co/CMS/public/cms/",
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
