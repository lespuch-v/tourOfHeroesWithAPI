import { HeroHealthPipe } from './hero-health.pipe';

describe('HeroHealthPipe', () => {
  it('create an instance', () => {
    const pipe = new HeroHealthPipe();
    expect(pipe).toBeTruthy();
  });
});
