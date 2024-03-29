const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3)

    expect(total).toBe(13)
})

test('Shoul calculate with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('Should convert 32 F to 0 C', () => {

    const FToC = fahrenheitToCelsius(32)
    expect(FToC).toBe(0)
})

test('Should convert 0 C to 32 F', () => {

    const CToF = celsiusToFahrenheit(0)
    expect(CToF).toBe(32)
})

test('Shoudl add 2 numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('Should add two numbers async/await', async () => {
    const sum = await add(22,10)
    expect(sum).toBe(32)
})

