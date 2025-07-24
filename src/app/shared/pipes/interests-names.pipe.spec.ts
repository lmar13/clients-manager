import { InterestsNamesPipe } from './interests-names.pipe';

describe('InterestsNamesPipe', () => {
  let pipe: InterestsNamesPipe;

  beforeEach(() => {
    pipe = new InterestsNamesPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should join multiple interests with commas', () => {
    const interests = ['Reading', 'Traveling', 'Cooking'];
    const result = pipe.transform(interests);
    expect(result).toBe('Reading, Traveling, Cooking');
  });

  it('should return a single interest without commas', () => {
    const interests = ['Reading'];
    const result = pipe.transform(interests);
    expect(result).toBe('Reading');
  });

  it('should return an empty string when no interests are provided', () => {
    const interests: string[] = [];
    const result = pipe.transform(interests);
    expect(result).toBe('');
  });
});
