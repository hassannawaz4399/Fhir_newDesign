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

                <div className=" table-header col-10 col-lg-6" >
                    <h2 className="mt-3">Table Data:</h2>

                </div>
            </div>
            <Outlet />
        </div>
    </>)
}
export default Layout;