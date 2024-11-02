import { HeroRatingPipe } from './hero-rating.pipe';

describe('HeroRatingPipe', () => {
  it('create an instance', () => {
    const pipe = new HeroRatingPipe();
    expect(pipe).toBeTruthy();
  });
});
