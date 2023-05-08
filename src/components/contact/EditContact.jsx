import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContactContext } from '../../context/contactContext';
import { useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { getContact, updateContact, } from "../../services/contactService";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/Colors";
import Spiner from "../Spiner";
import { contactSchema } from '../../validations/contactvalidation';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useImmer } from 'use-immer';
const EditContact = () => {
  const navigate = useNavigate();
  const { contactId } = useParams();
  const { loading, setLoading, groups, contacts, setContacts, setFilteredContacts } = useContext(ContactContext)
  const [contact, setContact] = useImmer({});
  useEffect(() => {
    const fetchDate = async () => {
      try {
        setLoading(true)
        const { data: contactData } = await getContact(contactId);

        setLoading(false);
        setContact(contactData)
      } catch (err) {
        console.log(err.message)
        setLoading(true);
      }
    }
    fetchDate();
  }, [])

  const submitForm = async values => {
    try {
      setLoading(true);
      const { data, status } = await updateContact(values, contactId);

      if (status === 200) {
        setLoading(false);
        toast.info("مخاطب با موفقیت ویرایش شد")
        setContacts((draf) => {
          const contactIndex = draf.findIndex((c)=>c.id===parseInt(contactId))
          draf[contactIndex]={...data}
        })

        setFilteredContacts((draf) => {
          const contactIndex = draf.findIndex((c)=>c.id===parseInt(contactId))
          draf[contactIndex]={...data}
        })
        setLoading(false);
        navigate("/contacts")
      }
    } catch (err) {
      console.log(err.message)
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <Spiner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                  <Formik
                    initialValues={contact}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      submitForm(values)
                    }}
                  >
                    <Form>
                      <div className="mb-2">
                        <Field
                          name="fullname"
                          type="text"
                          className="form-control"
                          placeholder="نام و نام خانوادگی"

                        />
                        <ErrorMessage name="fullname" render={msg => <div className="text-danger">{msg}</div>} />
                      </div>
                      <div className="mb-2">
                        <Field
                          name="photo"
                          type="text"
                          className="form-control"
                          placeholder="آدرس تصویر"
                        />
                        <ErrorMessage name="photo" render={msg => <div className="text-danger">{msg}</div>} />
                      </div>
                      <div className="mb-2">
                        <Field
                          name="mobile"
                          type="number"
                          className="form-control"
                          placeholder="شماره موبایل"
                        />
                        <ErrorMessage name="mobile" render={msg => <div className="text-danger">{msg}</div>} />
                      </div>
                      <div className="mb-2">
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="آدرس ایمیل"
                        />
                        <ErrorMessage name="email" render={msg => <div className="text-danger">{msg}</div>} />
                      </div>
                      <div className="mb-2">
                        <Field
                          type="text"
                          name="job"
                          className="form-control"
                          placeholder="شغل"
                        />

                      </div>
                      <div className="mb-2">
                        <Field
                          name="group"
                          as="select"
                          className="form-control"
                        >
                          <option value="">انتخاب گروه</option>
                          {
                            groups.length > 0 && groups.map((group) => (
                              <option key={group.id} value={group.id}>{group.name}</option>
                            ))
                          }
                        </Field>
                        <ErrorMessage name="group" render={msg => <div className="text-danger">{msg}</div>} />
                      </div>
                      <div className="mx-2">
                        <input
                          type="submit"
                          className="btn"
                          style={{ backgroundColor: PURPLE }}
                          value="ساخت مخاطب"
                        />
                        <Link
                          to={"/contacts"}
                          className="btn mx-2"
                          style={{ backgroundColor: COMMENT }}
                        >
                          انصراف
                        </Link>
                      </div>
                    </Form>

                  </Formik>

                </div>
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
