import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], email: string): any[] {

    if (!items) {
      return [];
    }
    if (!email) {
      return items;
    }
    email = email.toLocaleLowerCase();

    return items.filter(it => {
      return it.toLocaleLowerCase().includes(email);
    });
  }
}