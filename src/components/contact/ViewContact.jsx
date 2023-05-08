import { useEffect, useState , useContext } from 'react';
import { ContactContext } from '../../context/contactContext';
import { Link, useParams } from 'react-router-dom';
import { getContact, getGroup } from '../../services/contactService'
import { CURRENTLINE, CYAN, PURPLE } from "../../helpers/Colors";
import Spiner from './../Spiner';
const ViewContact = () => {

  const { contactId } = useParams();
  const {loading,setLoading} = useContext(ContactContext)
  const [state, setState] = useState({
    contact: {},
    group: {},
  })

  useEffect(() => {  
    const fetchDate = async () => {
      try {

        setLoading(true)
        const { data: contactDate } = await getContact(contactId);
        const { data: contactGrroup } = await getGroup(contactDate.group)
        setLoading(false)
        setState({ ...state, contact: contactDate, group: contactGrroup })
      } catch (err) {
        console.log(err.message)
        setState({ ...state, loading: true })
      }
    }
    fetchDate();
  }, [])
  const { contact, group } = state;
  return (
    <>
      <section className="view-contact-intro p3">
        <div className="container">
          <div className="row my-2 text-center">
            <p className="h3 fw-bold" style={{ color: CYAN }}>
              اطلاعات مخاطب
            </p>
          </div>
        </div>
      </section>

      <hr style={{ backgroundColor: CYAN }} />

      {loading ? (
        <Spiner />
      ) : (
        <>
          {Object.keys(contact).length > 0 && (
            <section className="view-contact mt-e">
              <div
                className="container p-2"
                style={{ borderRadius: "1em", backgroundColor: CURRENTLINE }}
              >
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img
                      src={contact.photo}
                      alt=""
                      className="img-fluid rounded"
                      style={{ border: `1px solid ${PURPLE}` }}
                    />
                  </div>
                  <div className="col-md-9">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-dark">
                        نام و نام خانوادگی :{" "}
                        <span className="fw-bold">{contact.fullname}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        شماره موبایل :{" "}
                        <span className="fw-bold">{contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        ایمیل : <span className="fw-bold">{contact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        شغل : <span className="fw-bold">{contact.job}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        گروه : <span className="fw-bold">{group.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <Link
                      to={"/contacts"}
                      className="btn"
                      style={{ backgroundColor: PURPLE }}
                    >
                      برگشت به صفحه اصلی
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default ViewContact;