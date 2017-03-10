import {
    fullBlack, darkBlack, lightBlack, minBlack,
    fullWhite, darkWhite, lightWhite,
} from './colors';
import * as assign from "object-assign";


export class Typography {

    textFullBlack = fullBlack;
    textDarkBlack = darkBlack;
    textLightBlack = lightBlack;
    textMinBlack = minBlack;
    textFullWhite = fullWhite;
    textDarkWhite = darkWhite;
    textLightWhite = lightWhite;

    // font weight
    fontWeightLight = 300;
    fontWeightNormal = 400;
    fontWeightMedium = 500;

    fontStyleButtonFontSize = 14;

    constructor(init?: Partial<Typography>) {
        assign(this, init);
    }
}

export default new Typography();
