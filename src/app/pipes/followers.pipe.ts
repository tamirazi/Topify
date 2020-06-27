import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'followers',
})
export class FollowersPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    let followers: string;
    let intV = parseInt(value);
    if (intV) {
      followers = value;
      if (intV >= 1000000) {
        followers = (intV / 1000000).toFixed(1).toString() + ' M';
      } else if (intV >= 1000) {
        followers = (intV / 1000).toFixed(1).toString() + ' K';
      }
      return followers;
    }
    return value;
  }

  float2int(value: number) {
    // tslint:disable-next-line:no-bitwise
    return value | 0;
  }
}
