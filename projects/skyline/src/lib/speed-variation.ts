  export class SpeedVariation {

    public static VARIATIONS = [
        { 'title':'1', speed: 1},
        { 'title':'2', speed: 2},
        { 'title':'4', speed: 4},
        { 'title':'1/4', speed: 0.25},
        { 'title':'1/2', speed: 0.5},
    ];

    public static next(currentVariation: any): any {
        let variationFound = -1;
        for (let i = 0; (i < SpeedVariation.VARIATIONS.length) && (variationFound < 0); i++) {
            if (SpeedVariation.VARIATIONS[i].speed === currentVariation.speed) {
                variationFound = (i === 4) ? 0 : i+1;
            }
        }
        return SpeedVariation.VARIATIONS[variationFound];
    }
  }
