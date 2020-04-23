import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'followers'
})
export class FollowersPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let followers: string;
    if (value >= 1000000)
    {
      followers = this.float2int((value / 1000000)) + 'M';
    }
    else if (value >= 1000)
    {
      followers = this.float2int(( value / 1000)) + 'K';
    }
    return followers;
  }

  float2int(value: number) {
    // tslint:disable-next-line:no-bitwise
    return value | 0;
  }

}
