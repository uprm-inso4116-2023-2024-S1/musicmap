//Time complexity of O(1) according to documentation of Math.random()
// 0.1 obfuscation range to make sure the altering of location is not as drastic
// directional bias applied to add to randomness
function locationObfuscation(la, lo, directionBias = 0.2) {
    const obfuscationRange = 0.01;

    //Latitude section
    if (Math.random() < 0.5) {
        la = la - Math.random() * (obfuscationRange + directionBias);
    } else {
        la = la + Math.random() * (obfuscationRange - directionBias);
    }

    //Longitude section
    if (Math.random() < 0.5) {
        lo = lo - Math.random() * (obfuscationRange - directionBias);
    } else {
        lo = lo + Math.random() * (obfuscationRange + directionBias);
    }

        return { lat: la, lon: lo };
    }
