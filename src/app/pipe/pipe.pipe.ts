import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipe'
})
export class PipePipe implements PipeTransform {

  transform(values: any[], args?: any): any {
    // tslint:disable-next-line:curly
    if (!values) return values;

    return values.filter(value => value.categorytype.indexOf(args.categorytype) !== -1);
  }

}
