import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], criteria: any): any {

    return items.filter(item =>{
       for (let key in item ) {
         if((""+item[key]).toLowerCase().includes(criteria)){
            return true;
         }
       }
       return false;
    });
}

}
