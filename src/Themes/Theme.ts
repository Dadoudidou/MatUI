import { ITheme } from "./ITheme";

export class Theme implements ITheme {

    palette: {
        primary1Color: ""
        primary2Color: ""
        primary3Color: ""
        accent1Color: ""
        accent2Color: ""
        accent3Color: ""
        textColor: ""
        secondaryTextColor: ""
        alternateTextColor: ""
        disabledColor: ""
        shadowColor: ""
    }
    typography: {
        fontFamily: ""
        fontSize: ""
    }

}