import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable, delay, catchError, of } from 'rxjs';
import { Produto } from '../model/produto';
import { ProdutosService } from '../service/produtos.service';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../dialog/dialog.component';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [
    MatTableModule,
    AsyncPipe,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.css',
})
export class ListaProdutosComponent {
  produtos$: Observable<Produto[]>;
  produtos_array: Produto[] = [];
  displayedColumns = ['nome', 'descricao', 'acao'];

  constructor(
    private produtosService: ProdutosService,
    public _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    produtosService.list().subscribe((p) => (this.produtos_array = p));
    this.produtos$ = produtosService
      .list()
      .pipe(delay(500))
      .pipe(
        catchError((error) => {
          console.log(error);
          this.onError(error.message, '');
          return of([]);
        })
      );
  }

  onError(errorMessage: string, action: string) {
    this._snackBar.open(errorMessage, action, {
      duration: 3000,
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  onEdit(id: number) {
    this.router.navigate([id.toString() + '/edit'], {
      relativeTo: this.activatedRoute,
    });
  }

  openDialog(id: number) {
    this.dialog.open(Dialog, {
      data: {
        id: id,
      },
    });
  }
}
