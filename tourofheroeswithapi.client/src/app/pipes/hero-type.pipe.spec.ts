import { HeroTypePipe } from './hero-type.pipe';

describe('HeroTypePipe', () => {
  it('create an instance', () => {
    const pipe = new HeroTypePipe();
    expect(pipe).toBeTruthy();
  });
});
