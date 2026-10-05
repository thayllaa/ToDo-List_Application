/* eslint-disable @unicorn/filename-case */
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Tag } from '../../core/models';
import { ConfirmService } from '../../core/services/confirm.service';
import { ToastService } from '../../core/services/toast.service';
import { errorMessage } from '../../core/utils/http';
import { TagService } from '../tasks/services/tag.service';
import { EmptyState } from '../../shared/components/empty-state';
import { Spinner } from '../../shared/components/spinner';
import { LucidePencil, LucideTrash2 } from '@lucide/angular';

@Component({
  selector: 'app-tags-section',
  imports: [ReactiveFormsModule, EmptyState, Spinner,  LucidePencil, LucideTrash2],
  templateUrl: './tags.html',
})
export class TagsSection implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(TagService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmService);

  items = signal<Tag[]>([]);
  loading = signal(true);
  saving = signal(false);
  editing = signal<Tag | null>(null);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    color: ['#6b7280'],
  });

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.list().subscribe({
      next: (list) => {
        this.items.set(list);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Não foi possível carregar as tags.');
      },
    });
  }

  startEdit(t: Tag) {
    this.editing.set(t);
    this.form.setValue({ name: t.name, color: t.color || '#6b7280' });
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
    const payload = { name: v.name.trim(), color: v.color };
    const current = this.editing();
    this.saving.set(true);

    const request$ = current ? this.api.update(current.id, payload) : this.api.create(payload);
    request$.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: () => {
        this.toast.success(current ? 'Tag atualizada.' : 'Tag criada.');
        this.cancelEdit();
        this.load();
      },
      error: (e) =>
        this.toast.error(errorMessage(e, current ? 'Não foi possível atualizar a tag.' : 'Não foi possível criar a tag.')),
    });
  }

  async remove(t: Tag) {
    const ok = await this.confirm.ask({
      title: 'Excluir tag',
      message: `Deseja excluir a tag "${t.name}"? Ela será removida das tarefas que a usam.`,
      confirmText: 'Excluir tag',
      danger: true,
    });
    if (!ok) return;
    this.api.remove(t.id).subscribe({
      next: () => {
        this.items.update((l) => l.filter((x) => x.id !== t.id));
        this.toast.success('Tag excluída.');
      },
      error: (e) => this.toast.error(errorMessage(e, 'Não foi possível excluir a tag.')),
    });
  }
}
