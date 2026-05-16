import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Cor } from './cor.model';
import { environment } from '../../core/config/environment';

@Injectable({
    providedIn: 'root'
})
export class CorService {

    
    private api = `${environment.apiUrl}/cores`;

    constructor(private http: HttpClient) {}

    listar(): Observable<Cor[]> {
        return this.http.get<Cor[]>(this.api);
    }

    salvar(cor: Cor): Observable<Cor> {

        if (cor.id) {
            return this.http.put<Cor>(
                `${this.api}/${cor.id}`,
                cor
            );
        }

        return this.http.post<Cor>(this.api, cor);
    }

    excluir(id: number): Observable<void> {
        return this.http.delete<void>(`${this.api}/${id}`);
    }
}