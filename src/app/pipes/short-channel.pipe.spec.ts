import { ShortChannelPipe } from './short-channel.pipe';

describe('ShortChannelPipe', () => {
  it('create an instance', () => {
    const pipe = new ShortChannelPipe();
    expect(pipe).toBeTruthy();
  });
});
