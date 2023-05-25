import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role',
})
export class RolePipe implements PipeTransform {
  transform(role: string | undefined, ...args: unknown[]): unknown {
    return role ? role.substring(5) : '';
  }
}
