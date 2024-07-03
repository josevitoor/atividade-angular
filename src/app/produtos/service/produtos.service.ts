import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, first, map, switchMap, tap } from 'rxjs';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private API_URL = 'http://localhost:3000/produtos';

  constructor(private httpClient: HttpClient) {}

  list(): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(this.API_URL).pipe(
      first(),
      tap((p) => console.log(p))
    );
  }

  create(p: Produto) {
    return this.httpClient.get<Produto[]>(this.API_URL).pipe(
      map((produtos) => {
        const lastId = produtos.reduce(
          (maxId, produto) => Math.max(maxId, produto.id),
          0
        );
        const id = lastId + 1;
        return { ...p, id: id.toString() };
      }),
      switchMap((newProduto) =>
        this.httpClient.post<Produto>(this.API_URL, newProduto)
      )
    );
  }

  delete(id: number) {
    return this.httpClient.delete(this.API_URL + '/' + id);
  }

  update(id: number, p: Produto): Observable<Produto> {
    return this.httpClient.put<Produto>(
      this.API_URL + '/' + id,
      JSON.stringify(p)
    );
  }

  getOne(id: number): Observable<Produto> {
    return this.httpClient.get<Produto>(this.API_URL + '/' + id);
  }
}
