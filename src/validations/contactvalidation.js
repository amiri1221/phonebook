import * as Yup from 'yup'

export const contactSchema = Yup.object().shape({
    fullname: Yup.string().required("لطفا نام و نام خانودادگی پر شود"),
    photo: Yup.string().url("آدرس معتبر است").required("تصویر مخاطب الزامی است"),
    mobile: Yup.string().required("موبایل الزامی است"),
    email: Yup.string().required("لطفا ایمیل وارد کنید").email(),
    job: Yup.string().nullable(),
    group: Yup.string().required("انتخاب گروه الزامی است")
})