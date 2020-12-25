
class Deck {
    constructor() {
        this.arr = [];

        this.elem_remaining = document.getElementById("remaning");
        for(var i = 0; i < 3; i++)
            for(var j = 0; j < 3; j++)
                for(var k = 0; k < 3; k++)
                    for(var l = 0; l < 3; l++)
                        this.arr.push("" + i + j + k + l);
                        
        this.arr = arrayShuffle(this.arr);
    }

    drawCard() {
        return this.arr.pop();
    }

    getCount() {
        return this.arr.length;
    }
}
