// import { testServer } from "../src/server/server";

// // The describe() function takes two arguments - a string description, and a test suite as a callback function.
// // A test suite may contain one or more related tests
// describe("Check if express server is defined", () => {
//     // The test() function has two arguments - a string description, and an actual test as a callback function.
//     test("Testing if express server exists", () => {
//         // Define the input for the function, if any,the form of variables/array
//         expect(testServer).toBeDefined()
//         // Define the expected output, if any, in the form of variables/array
//         // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
//         // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
//     })

// })

const app = require('../src/server/server') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

it('tests /test endpoint', async () => {
    const response = await request.get('/test')
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('pass!')
})