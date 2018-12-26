require("jest");

const math = require("../../models/mathLib");

describe("Testing Math Library", function () {


    it("it should sum 2,2 to be 4", function () {
        //arrange

        let x = 2,
            y = 2,
            expectedResult = 4;

        // act
        var result = math.sum(x, y);

        // assert //#endregion
        expect(result).toBe(expectedResult);
    })

    it("it should sum -2,2 to be 4", function () {
        //arrange

        let x = -2,
            y = 2,
            expectedResult = 4;

        // act
        var result = math.sum(x, y);

        // assert //#endregion
        expect(result).toBe(expectedResult);
    })

})