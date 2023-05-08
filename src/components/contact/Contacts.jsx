import { CURRENTLINE, ORANGE, PINK } from '../../helpers/Colors';
import Contact from './Contact';
import Spiner from "../Spiner";
import { useContext } from 'react';
import { ContactContext } from '../../context/contactContext';
import { Link } from 'react-router-dom';
const Contacts = () => {
    const {filteredContacts,deleteContact,loading} = useContext(ContactContext)
  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3">
                <Link to={"/contacts/add"} className="btn mx-2 mt-3" style={{ background: PINK }}>
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-2"></i>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      {
        loading ? <Spiner /> : (
          <section className="container">
            <div className="row">
              {
                filteredContacts.length > 0 ? filteredContacts.map(c => (
                  <Contact confrimcontact={() => deleteContact(c.id, c.fullname)} key={c.id} contact={c} />
                )) :
                  (
                    <div className="text-center py-5" style={{ backgroundColor: CURRENTLINE }}>
                      <p className="h3" style={{ color: ORANGE }}>
                        مخاطب یافت نشد
                      </p>
                      <img
                        src={require("../../assets/no-found.gif")}
                        alt="پیدا نشد"
                        className="w-25"
                      />
                    </div>
                  )
              }

            </div>
          </section>
        )
      }

    </>
  )

}
export default Contacts;