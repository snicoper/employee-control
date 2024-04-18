import { BreadcrumbItem } from './breadcrumbItem';

export class BreadcrumbCollection {
  private readonly items: Array<BreadcrumbItem> = [];

  add(text: string, link: string, icon = '', activate = true): this {
    const breadcrumb = new BreadcrumbItem(text, link, icon, activate);
    this.items.push(breadcrumb);

    return this;
  }

  getItems(): Array<BreadcrumbItem> {
    return this.items;
  }

  hasItems(): boolean {
    return this.items.length > 0;
  }
}
