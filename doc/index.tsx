import * as React from "react";
import * as ReactDOM from "react-dom";
import { hashHistory, Router } from "react-router";

import { loadRoutes } from "./routes";
let routes = loadRoutes();

class Main extends React.Component<any, any>
{
    render() {
        return (
            <div>
                <Router history={hashHistory} routes={routes} />
            </div>
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);