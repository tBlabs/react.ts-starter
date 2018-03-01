class A
{
    constructor(p: string)
    {
        this.Method(p);
    }

    public Method(p: string)
    {
        console.log('A' + p);
        return 'A';
    }
}

class B extends A
{
    constructor(p: string)
    {
        super(p);
    }

    public Method()
    {
        // console.log('B');
        return 'B'
    }
}

test('test', () =>
{
    // const a: A = new A();
    const b: B = new B('aaa');
    // expect(b.Method()).toBe('B');
});;