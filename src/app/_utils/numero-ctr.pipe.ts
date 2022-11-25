import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numeroCtr'
})
export class NumeroCtrPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return this.formatarNumero(value);
  }

  formatarNumero(numero: number) {
    return numero.toString().padStart(6, '0');
  }

}
