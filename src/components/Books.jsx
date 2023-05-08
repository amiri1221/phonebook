import { getBooks } from '../date/date';
import { NavLink, Outlet, useSearchParams, useLocation } from 'react-router-dom'
const Books = () => {
    const books = getBooks();
    const [SearchParams, setSearchParams] = useSearchParams();
    const location =useLocation();
    return (
        <>
            <di className="col-md-6" style={{ margin: "0 auto" }}>
                <input
                    dir="rtl"
                    value={SearchParams.get("filter") || ""}
                    onChange={(event) => {
                        let filter = event.target.value;
                        if (filter) {
                            setSearchParams({ filter })
                            console.log()
                        } else {
                            setSearchParams({})
                        }
                    }}
                    type="text"
                    style={{ backgroundColor: "gray", borderColor: "purple" }}
                    className="form-control"
                />
            </di>
           
            {books.filter((book) => {
                let filter = SearchParams.get("filter")
                if (!filter) return true;
                let name = book.name.toLowerCase();
                return name.startsWith(filter.toLowerCase())
            }).map((book) => (
                <NavLink style={({ isActive }) => {
                    return {
                        color: isActive ? "red" : ""
                    }
                }} to={`/books/${book.number}${location.search}`} key={book.number}>
                    {book.name}
                </NavLink>
            ))}
            <Outlet />
        </>
    )
}
export default Books;