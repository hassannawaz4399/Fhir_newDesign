import { NavLink, Outlet } from "react-router-dom"
import "./Home.css"

const Layout = (props) => {
    return (<>
        <div className="container-fluid">
            <div className="row ">
                <div className="col-12 col-lg-4 pt-3 datacolunm">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <NavLink className="nav-link" activeclassname='active' aria-current="page" to="search">Home</NavLink>
                        </li>
                        <li className="nav-item" role="presentation">
                            <NavLink className="nav-link" activeclassname='active' aria-current="page" to="queries">Queries</NavLink>
                        </li>
                        <li className="nav-item" role="presentation">
                            <NavLink className="nav-link" activeclassname='active' aria-current="page" to="crud">CRUD Operations</NavLink>
                        </li>
                    </ul>
                </div>

                {/* <ul className="nav">
                <li className="nav-item" activeClassName='active'>
                    <NavLink className="nav-link" activeClassName='active' aria-current="page" to="search">Search</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="#">Queries</NavLink>
                </li>
                <li className="nav-item">
                    <a class="nav-link" href="#">CRUD Operations</a>
                </li>
                  </ul> */}

                <div className=" table-header col-10 col-lg-8" >

                    <article className="navbar pr-0 pl-0">
                        <h3 >Table Data:</h3>
                        <nav class="navbar navbar-light ">
                            <img src="./image/logo.png"></img>
                            <i class="fa fa-sign-out" href="/" aria-hidden="true"></i></nav>
                    </article>

                </div>
           
            <Outlet />
            </div>
        </div>
    </>)
}
export default Layout;