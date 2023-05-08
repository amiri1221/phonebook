import { PURPLE } from "../../helpers/Colors";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
const Searchcontact = () => {
    const {contactSearch} =useContext(ContactContext)
    return (
        <div className="input-group mx-2 w-75" dir="ltr">
            <span
                className="input-group-text "
                id="basic-addon1"
                style={{ backgroundColor: PURPLE }}
            >
                <i className="fa fa-search"></i>
            </span>
            <input
                dir="rtl"
                type="text"
                onChange={event => contactSearch(event.target.value)}
                style={{ backgroundColor: "gray", borderColor: "purple" }}
                className="form-control"
                placeholder="search"
                aria-label="search"
                aria-describedby="basic-addon1"
            />
        </div>
    )
}
export default Searchcontact;