/* eslint-disable @unicorn/filename-case */
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Category } from '../../core/models';
import { ConfirmService } from '../../core/services/confirm.service';
import { ToastService } from '../../core/services/toast.service';
import { errorMessage } from '../../core/utils/http';
import { EmptyState } from '../../shared/components/empty-state';
import { Spinner } from '../../shared/components/spinner';
import { CategoriesService } from './categories.service';
import { TagsSection } from '../tags/tags';
import { CategoryIcon } from '../../core/constants/categoryIcon';
import { CATEGORY_ICONS, CATEGORY_COLORS, DEFAULT_CATEGORY_ICON } from '../../core/constants/category-icons';
import { LucidePencil, LucideTrash2 } from '@lucide/angular';

@Component({
  selector: 'app-categories-page',
  imports: [ReactiveFormsModule, EmptyState, Spinner, TagsSection, CategoryIcon, LucidePencil, LucideTrash2],
  templateUrl: './categories-page.html',
})
export class CategoriesPage implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(CategoriesService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmService);

  items = signal<Category[]>([]);
  loading = signal(true);
  error = signal(false);
  saving = signal(false);
  editing = signal<Category | null>(null);
  tab = signal<'categories' | 'tags'>('categories');

  tabClass(t: 'categories' | 'tags') {
    return (
      'border-b-2 px-4 py-2 text-sm font-medium transition ' +
      (this.tab() === t
        ? 'border-stone-900 text-stone-900'
        : 'border-transparent text-stone-500 hover:text-stone-700')
    );
  }

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    icon: [DEFAULT_CATEGORY_ICON, [Validators.required, Validators.maxLength(50)]],
    color: [CATEGORY_COLORS[0], Validators.required],
  });

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(false);
    this.api.list().subscribe({
      next: (list) => {
        this.items.set(list);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  startEdit(c: Category) {
    this.editing.set(c);
    this.form.setValue({
      name: c.name,
      icon: c.icon || DEFAULT_CATEGORY_ICON,
      color: c.color || CATEGORY_COLORS[0],
    });
  }

  cancelEdit() {
    this.editing.set(null);
    this.form.reset();
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const payload = { name: v.name.trim(), icon: v.icon.trim(), color: v.color };
    const current = this.editing();
    this.saving.set(true);

    const request$ = current ? this.api.update(current.id, payload) : this.api.create(payload);
    request$.pipe(finalize(() => this.saving.set(false))).subscribe({ // erro aqui
      next: () => {
        this.toast.success(current ? 'Categoria atualizada.' : 'Categoria criada.');
        this.cancelEdit();
        this.load();
      },
      error: (e) => this.toast.error(errorMessage(e, 'Não foi possível salvar a categoria.')),
    });
  }

  async remove(c: Category) {
    const ok = await this.confirm.ask({
      title: 'Excluir categoria',
      message: `Deseja excluir "${c.name}"? Verifique se não há tarefas usando essa categoria.`,
      confirmText: 'Excluir categoria',
      danger: true,
    });
    if (!ok) return;

    this.api.remove(c.id).subscribe({
      next: () => {
        this.items.update((l) => l.filter((x) => x.id !== c.id));
        this.toast.success('Categoria excluída.');
      },
      error: (e) => this.toast.error(errorMessage(e, 'Não foi possível excluir a categoria.')),
    });
  }

  iconOpen = signal(false);
  icons = Object.keys(CATEGORY_ICONS);

  selectIcon(name: string) {
    this.form.controls.icon.setValue(name);
    this.form.controls.icon.markAsDirty();
    this.iconOpen.set(false);
  }
}
