import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'followers',
})
export class FollowersPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    let followers: string;
    followers = value.toString();
    if (value >= 1000000) {
      followers = (value / 1000000).toFixed(1).toString() + 'M';
    } else if (value >= 1000) {
      followers = (value / 1000).toFixed(1).toString() + 'K';
    }
    return followers;
  }

  float2int(value: number) {
    // tslint:disable-next-line:no-bitwise
    return value | 0;
  }
}
