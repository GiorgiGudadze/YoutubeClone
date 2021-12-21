import React from "react"
import reactDom from "react-dom"
import App from "./components/App"
import { BrowserRouter, HashRouter} from "react-router-dom";
import './index.scss'

reactDom.render(
    <HashRouter>
    <App/>
    </HashRouter>,
    document.querySelector('#root')
)