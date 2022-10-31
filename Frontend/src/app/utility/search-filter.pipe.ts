import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: any[], filterText?: any): any {
    if (list == undefined) return null;

    if (!filterText) return list;
    filterText = filterText.toLowerCase();
    return list.filter(function (item: any) {
      return JSON.stringify(item).toLocaleLowerCase().includes(filterText);
    })
  }
}
