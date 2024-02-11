import { ProtectXssPipe } from './protect-xss.pipe';

describe('ProtectXssPipe', () => {
  it('create an instance', () => {
    const pipe = new ProtectXssPipe();
    expect(pipe).toBeTruthy();
  });
});
