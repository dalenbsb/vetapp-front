import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { environment } from '../../core/config/environment';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private api = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) {}

    listar(): Observable<User[]> {
        return this.http.get<User[]>(this.api);
    }

    buscarPorId(id: number): Observable<User> {
        return this.http.get<User>(`${this.api}/${id}`);
    }

    salvar(user: User): Observable<User> {
        return this.http.post<User>(this.api, user);
    }

    atualizar(user: User): Observable<User> {
        return this.http.put<User>(`${this.api}/${user.id}`, user);
    }

    deletar(id: number): Observable<void> {
        return this.http.delete<void>(`${this.api}/${id}`);
    }
}