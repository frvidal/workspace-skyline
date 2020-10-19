import {Variation} from './variation';

export class SpeedVariation {

    public static VARIATIONS: Variation[] = [
        { title: '1', acceleration: 1},
        { title: '2', acceleration: 2},
        { title: '4', acceleration: 4},
        { title: '&frac14;', acceleration: 0.25},
        { title: '&#189;', acceleration: 0.5},
    ];

    public static first(): Variation {
        return SpeedVariation.VARIATIONS[0];
    }

    public static next(currentVariation: Variation): Variation {
        let variationFound = -1;
        for (let i = 0; (i < SpeedVariation.VARIATIONS.length) && (variationFound < 0); i++) {
            if (SpeedVariation.VARIATIONS[i].acceleration === currentVariation.acceleration) {
                variationFound = (i === 4) ? 0 : i + 1;
            }
        }
        return SpeedVariation.VARIATIONS[variationFound];
    }
  }
