import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Especie } from './especie.model';
import { environment } from '../../core/config/environment';

@Injectable({
    providedIn: 'root'
})
export class EspecieService {

    
    private api = `${environment.apiUrl}/especies`;

    constructor(private http: HttpClient) {}

    listar(): Observable<Especie[]> {
        return this.http.get<Especie[]>(this.api);
    }

    salvar(especie: Especie): Observable<Especie> {

        if (especie.id) {
            return this.http.put<Especie>(
                `${this.api}/${especie.id}`,
                especie
            );
        }

        return this.http.post<Especie>(this.api, especie);
    }

    excluir(id: number): Observable<void> {
        return this.http.delete<void>(`${this.api}/${id}`);
    }
}