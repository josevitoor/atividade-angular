import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ProdutosService } from '../service/produtos.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
  ],
})
export class Dialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private produtosService: ProdutosService
  ) {}

  onDelete() {
    this.produtosService.delete(this.data.id).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.log(e),
      complete: () => window.location.reload(),
    });
  }
}
