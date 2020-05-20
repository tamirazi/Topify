import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class Duration implements PipeTransform {
  transform(value: any, ...args: any[]) {
    const seconds = Math.floor((value / 1000) % 60);
    const minutes = Math.floor((value / (1000 * 60)) % 60);
    const hours = Math.floor((value / (1000 * 60 * 60)) % 24);

    const hh = hours < 10 ? '0' + hours : hours;
    const mm = minutes < 10 ? '0' + minutes : minutes;
    const ss = seconds < 10 ? '0' + seconds : seconds;
    if (hh !== '00') {
      return hh + ':' + mm + ':' + ss;
    }
    return mm + ':' + ss;
  }
}
