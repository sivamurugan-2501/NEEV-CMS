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
      "get" : "/product",
      "delete" : "/product/delete",
      "update" : "/product/update"
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
      "delete" : "/faq/delete",
      "update" : "/faq/update",
      "get" : "/faq"
    }, 

    "tgm":{
      "add" : "/tgm/add"
    },
    "dealer":{
      "add" : "/dealer/add"
    },

    "user":{
      "add" : "/other_user/add",
      "list" : "/other_user/list",
      "get" : "/other_user",
      "update" : "/other_user/update",
      "delete" : "/other_user/delete",
      "import" : "/other_user/import",
      "login" : "/other_user/login",
      "validateOTP" : "/otp/validate",
      "checkRole" : "/user/role"
    },

    "event":{
      "add" : "/news_board/add",
      "list" : "/news_board/list",
      "delete" : "/news_board/delete",
      "get" : "/news_board",
      "update" : "/news_board/update"
    },

    "notification":{
      "send" : "/notification/add",
      "list" : "/notification/list",
      "delete" : "/notification/delete"
    },

    "user_uploads" :{
      "get" : "/user/upload/get"
    },

    "business_opp" :{
      "add" : "/business_opp/add",
      "list" : "/business_opp/list",
      "delete" : "/business_opp/delete",
      "get" : "/business_opp",
      "update" : "/business_opp/update"
    },
    "vas" :{
      "add" : "/vas/add",
      "list" : "/vas/list",
      "delete" : "/vas/delete",
      "get" : "/vas/get",
      "update" : "/vas/update"
    },
    "dashboard" : {
      "stats" : "/stats"
    },
    "app_enq" :{
      "list" : "/application_enquiries/list"
    }
    
  }
};
