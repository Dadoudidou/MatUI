import Home from "./Home";

export const loadRoutes = (store?: any) => {

    //Chargement des fichiers de routes
    let _requestFiles = require.context(".", true, /^\.\/[a-zA-Z0-9_]*\/index\.ts$/);
    let _childRoutes: any[] = [];
    let _keys = _requestFiles.keys();

    //execute routes
    for (var i = 0; i < _keys.length; i++) {
        let _route = _requestFiles(_keys[i]);
        if (!_route["loadRoutes"]) continue;
        _childRoutes.push(_route.loadRoutes(store));
    }

    let _root = {
        path: "/",
        component: Home,
        childRoutes: _childRoutes
    };

    return _root;
}