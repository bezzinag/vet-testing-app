import { VirusStatusPipe } from './virus-status.pipe';

describe('VirusStatusPipe', () => {
  let pipe: VirusStatusPipe;

  beforeEach(() => {
    pipe = new VirusStatusPipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform true to "REACTIVE"', () => {
    expect(pipe.transform(true)).toBe('REACTIVE');
  });

  it('should transform false to "NON-REACTIVE"', () => {
    expect(pipe.transform(false)).toBe('NON-REACTIVE');
  });

  it('should handle invalid input gracefully', () => {
    // Optional: fallback logic if you choose to implement it in the pipe
    expect(pipe.transform(null as any)).toBe('NON-REACTIVE');
  });
});
