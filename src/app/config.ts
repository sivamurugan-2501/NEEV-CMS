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
       "list" : "/video/list",
       "delete" : "/video/delete",
       "get" : "/video/get",
       "update" : "/video/update"
    },
    "product" : {
      "add" : "/product/add",
      "list" : "/product/list",
      "features" : "/product/update/features",
      "specifications" : "/product/update/specifications",
      "gallery" : "/product/update/gallery",
      "brochure" : "/product/update/brochure",
      "video" : "/product/update/video",
   },
    "authenticate" : "/authenticate",
    "configs" : {
        "language" : "/config/languages",
        "roles" : "/config/roles",
        "states" : "/config/states",
        "regions" : "/config/regions"
    },
    "faq":{
      "add" : "/faq/add",
      "list" : "/faq/list",
      "delete" : "/faq/delete"
    },

    "tgm":{
      "add" : "/tgm/add"
    },
    "dealer":{
      "add" : "/dealer/add"
    },

    "user":{
      "add" : "/other_user/add",
      "list" : "/other_user/list"
    },

    "event":{
      "add" : "/news_board/add",
      "list" : "/news_board/list"
    },

    "notification":{
      "send" : "/notification/add",
      "list" : "notification/list"
    }
    
  }
};
