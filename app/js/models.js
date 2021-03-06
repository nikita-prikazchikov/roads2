function ElementStress(road){
    this.stress = road.coordinates;
    this.E = road.E;
    this.l = road.l;
    this.W = road.W;
    this.J = road.J;
    this.A = 0;
    this.work = [];
    this.k = this.W * this.W * this.l / (2 * 3 * this.E * this.J);
}

ElementStress.prototype.calculate = function() {
    var arr = this.stress;

    this.A = 0;
    for (var i = 0; i < arr.length - 1; i++) {
        var s1 = arr[i];
        var s2 = arr[i + 1];
        var ai = 0;
        if (s1 > 0 && s2 > 0 && s2 > s1) {
            ai += this.getDeltaA(s2 * s2 - s1 * s1);
//            console.log("positive: s[i]: " + s1 + " s[i+1]: " + s2 + " work: " + ai);
        }
        else if (s1 < 0 && s2 < 0 && s1 > s2) {
            ai += this.getDeltaA(s2 * s2 - s1 * s1);
//            console.log("negative: s[i]: " + s1 + " s[i+1]: " + s2 + " work: " + ai);
        }
        else if ((s1 >= 0 && s2 < 0) || (s1 <= 0 && s2 > 0)) {
            ai += this.getDeltaA(s2 * s2);
//            console.log("near zero: s[i]: " + s1 + " s[i+1]: " + s2 + " work: " + ai);
        }
        else {
//            console.log("not included: s[i]: " + s1 + " s[i+1]: " + s2 + " work: " + ai);
        }
        this.A += ai;
        //this.work.push(ai);
    }
};

ElementStress.prototype.getDeltaA = function(deltaSigma) {
    //return deltaSigma * this.S * this.l / this.E;
    return deltaSigma * this.k;
};
