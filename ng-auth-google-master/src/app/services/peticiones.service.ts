import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { ObjectUnsubscribedError } from "rxjs";

@Injectable()
export class PeticionesService{
    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = "http://45.236.128.235:8000/tipossocio/api/v1/tipossocio/";
    }

    gettipoSocio(tipoSocioId): Observable<any>{
        return this._http.get(this.url+tipoSocioId);
    }
}