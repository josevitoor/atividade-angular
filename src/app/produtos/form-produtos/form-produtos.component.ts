import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProdutosService } from '../service/produtos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-produtos',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './form-produtos.component.html',
  styleUrl: './form-produtos.component.css',
})
export class FormProdutosComponent {
  form: FormGroup;
  actionType: string;
  id: number = 0;
  buttonTitle: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: ProdutosService,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.actionType = this.router.url.includes('new') ? 'new' : 'edit';
    this.buttonTitle = this.actionType === 'new' ? 'Cadastrar' : 'Editar';
    this.form = this.formBuilder.group({
      nome: [null],
      descricao: [null],
    });

    if (this.actionType === 'edit') {
      const param_id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = param_id != null ? parseInt(param_id) : 0;

      this.service.getOne(this.id).subscribe((response) => {
        this.form = this.formBuilder.group({
          nome: [response.nome],
          descricao: [response.descricao],
        });
      });
    }
  }

  onSubmit() {
    if (this.actionType === 'new') {
      this.service.create(this.form.value).subscribe({
        next: (v) => this.onSucess(),
        error: (e) => this.snackBar.open(e, '', { duration: 1000 }),
        complete: () => console.info('complete'),
      });
    } else {
      this.service.update(this.id, this.form.value).subscribe({
        next: (v) => this.onSucess(),
        error: (e) => this.snackBar.open(e, '', { duration: 1000 }),
        complete: () => console.info('complete'),
      });
    }
  }

  onSucess() {
    this.snackBar.open('Salvo!', '', { duration: 1000 });
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }
}
