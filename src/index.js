import React from "react"
import reactDom from "react-dom"
import App from "./components/App"
import { BrowserRouter} from "react-router-dom";
import './index.css'

reactDom.render(
    <BrowserRouter>
    <App/>
    </BrowserRouter>,
    document.querySelector('#root')
)