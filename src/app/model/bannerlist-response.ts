export interface BannerlistResponse extends Response { 

        banners : Array<BannerData>,
        baseURL : String

}

export interface BannerData{
    caption :String;
    id:number;
    path?:String;
    type:number;
    upload_path? : String,
}
