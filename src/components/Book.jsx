import { useParams, useNavigate,useLocation } from "react-router-dom";
import { getBook , deletebook } from "../date/date";
const Book = () => {
    const bookId = useParams();
    const book = getBook(parseInt(bookId.bookId))
    const navigate =useNavigate();
    const location = useLocation();
    console.log(navigate)
    if (book) {
        return (
            <>
                <h1 className="text-whit">کتاب با شناسه:{book.name}</h1>
                <button onClick={()=>{
                    deletebook(book.number);
                    navigate("/books" + location.search )
                }}>حذف کتاب</button>
            </>
        )
    }
    else {
        return <h1>کتاب یافت نشد</h1>
    }

}
export default Book;