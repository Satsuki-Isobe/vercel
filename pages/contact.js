import { json } from "body-parser";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const contact = () => {

  const validation = () =>
  Yup.object().shape({
    email: Yup.string()
      .email("メールアドレスの形式で入力してください")
      .required("必須項目です"),
      title: Yup.string().required("必須項目です"),
      content: Yup.string().required("必須項目です")
  });

  async function handleSubmit(v){
    console.log(v)
    const params = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(v)
    }
    const res = await fetch('/send', params)
    .then(res => res.json())
    console.log(res)
  }

  const test = async () => {
    const res = await fetch('/cms')
    .then(res => res.json())
    console.log(res)
  };

  return (
    <div id="contact">
      <button onClick={() => test()}>テスト</button>
      <Formik 
        initialValues={{ 
          email: "sample@sample.com",
          title: "タイトル",
          content: "test"
        }}
        validationSchema={validation()}
        onSubmit={values => handleSubmit(values)}
      >
        {({ values, errors }) => {
          return (
            <Form action={`mailto:patata.satsuki@gmail.com`} method={`POST`} encType="text/plain">
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email">{msg => <div>{msg}</div>}</ErrorMessage>
              <Field type="text" name="title" placeholder="内容を入力してください。" />
              <ErrorMessage name="title">{msg => <div>{msg}</div>}</ErrorMessage>
              <Field type="text" name="content" placeholder="内容を入力してください。" />
              <ErrorMessage name="content">{msg => <div>{msg}</div>}</ErrorMessage>
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  )
}
export default contact