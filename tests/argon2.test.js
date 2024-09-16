import argon2 from 'argon2';
describe('test argon2', ()=>{
  test('hash', async()=>{
    const text = "hello world";
    const hash = await argon2.hash(text);
    expect(hash).toBeDefined();
    expect(typeof hash).toBe('string');
  })

  test('verify', async()=>{
    const text = "hello world";
    const hash = await argon2.hash(text);

    const result = await argon2.verify(hash, text);
    expect(result).toBe(true);
  })
})