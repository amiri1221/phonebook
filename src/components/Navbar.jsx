import Searchcontact from "./contact/Searchcontact";
import { useLocation } from 'react-router-dom';
import Colorfull from '../hoc/Colorfull'
const Navbar = () => {
    const location = useLocation();
    return (
        <nav className="navbar navbar-dark navbar-expand-sm shadow-lg">
            <div className="container">
                <div className="row w-100">
                    <div className="col">
                        <div className="navbar-brand">
                            <i className="fa fa-id-badge"></i>
                            {" "}  وب اپلیکیشن مدیرت {" "}
                            <span style={{ color: "purple" }}>مخاطبین</span>
                        </div>

                    </div>
                    {
                        location.pathname === "/contacts" ? (
                            <div className="col">
                                <Searchcontact/>
                            </div>
                        ) : null
                    }


                </div>
            </div>

        </nav>
    )
}
export default Colorfull(Navbar);