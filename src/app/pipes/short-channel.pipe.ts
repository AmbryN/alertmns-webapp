import { Pipe, PipeTransform } from '@angular/core';
import { Channel } from '../models/Channel';

@Pipe({
  name: 'shortChannel',
})
export class ShortChannelPipe implements PipeTransform {
  transform(channel: Channel, ...args: unknown[]): unknown {
    return `${channel.name.charAt(0)}${channel.id}`;
  }
}
