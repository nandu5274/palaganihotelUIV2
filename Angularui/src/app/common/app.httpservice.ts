import {Injectable} from '@angular/core';
import {Http, Request, Response, Headers, RequestOptionsArgs, RequestMethod} from "@angular/http";
import {RequestArgs} from "@angular/http/src/interfaces";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';



@Injectable()
export class CommonHttpService {
	
    protected headers: Headers;
	
    constructor(private _http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        //this.headers.append('Cache-Control', 'no-cache');
        //this.headers.append('Auth', 'bWZzOmRlbW8=');
  
    }
	
	getFullUrl(url:string){
		return url;//this.appConfig.ServerWithApiUrl+url;
	}

   /* get(url:string) : Observable<any> {
        return this._http.get(this.getFullUrl(url))
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }*/

    
    get(url:string,args?: RequestOptionsArgs) : Observable<any> {
         if (args == null) args = {};
        if (args.headers === undefined) args.headers = this.headers;
        console.log(url);
        console.log(args);
    
        return this._http.get(url,args)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
	
    post(url:string, data:any, args?: RequestOptionsArgs) : Observable<any> {
        if (args == null) args = {};
        if (args.headers === undefined) args.headers = this.headers;
        console.log(url);
        console.log(data);
        console.log(JSON.stringify(args));

        return this._http.post(this.getFullUrl(url), JSON.stringify(data), args)
            .map((res: Response) => CommonHttpService.json(res.json() ))
            .catch(this.handleError);
    }

    	
    DropboxPost(url:string, data:any, args?: RequestOptionsArgs) : Observable<any> {
        if (args == null) args = {};
        if (args.headers === undefined) args.headers = this.headers;
        console.log(url);
        console.log(data);
        console.log(JSON.stringify(args));

        return this._http.post(this.getFullUrl(url), data, args)
            .map((res: Response) => CommonHttpService.json(res))
            .catch(this.handleError);
    }


    	
    droboxpost(url:string, data:any, args?: RequestOptionsArgs) : Observable<File> {
        if (args == null) args = {};
        if (args.headers === undefined) args.headers = this.headers;
        console.log(url);
        console.log(data);
        console.log(JSON.stringify(args));

        return this._http.post(this.getFullUrl(url), JSON.stringify(data), args)
            .map((res: Response) => CommonHttpService.json(res))
            .catch(this.handleError);
    }

    put(url:string, data:any, args?: RequestOptionsArgs) : Observable<any> {
        if (args == null) args = {};
        if (args.headers === undefined) args.headers = this.headers;

        return this._http.put(this.getFullUrl(url), JSON.stringify(data), args)
            .map((res: Response) => CommonHttpService.json(res))
            .catch(this.handleError);
    }

    remove(url: string, data?: any, args?: RequestOptionsArgs): Observable<any> {
        if (args == null) args = {};

        args.url = this.getFullUrl(url);
        args.method = RequestMethod.Delete;
        if (!args.headers) args.headers = this.headers;
        args.body  = data ? JSON.stringify(data) : null;

        return this._http.request(new Request(<RequestArgs>args))
            .map((res: Response) => CommonHttpService.json(res))
            .catch(this.handleError);
    }

    private static json(res: Response): any {
        return res;
    }

    private handleError(error:any) {
        console.error(error);
        return Observable.throw(error);
    }
}
