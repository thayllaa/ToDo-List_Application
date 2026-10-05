/* eslint-disable @unicorn/filename-case */
import { Component, computed, input } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { CATEGORY_ICONS, DEFAULT_CATEGORY_ICON } from '../../core/constants/category-icons';

@Component({
    selector: 'app-category-icon',
    imports: [LucideDynamicIcon],
    template: `<svg [lucideIcon]="data()" [size]="size()" [color]="color() || '#78716c'"></svg>`,
})
export class CategoryIcon {
    icon = input<string | null | undefined>();
    color = input<string | null | undefined>();
    size = input(20);

    // emojis antigos ou nomes desconhecidos caem no ícone padrão
    data = computed(() => CATEGORY_ICONS[this.icon() ?? ''] ?? CATEGORY_ICONS[DEFAULT_CATEGORY_ICON]);
}