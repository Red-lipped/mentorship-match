import React from "react";
import "./SignupForm.css"

{/* <SignupForm onSuccess={() => alert("Signup successful!")} /> */}




const SignupForm: React.FC = () => {


        // set state ( formData) (setter function - setFormData) useState - updates state 
// const [formData, setFormData] = useState<{name: string, email: string, password: string }>({
//     name: "",
//     email: "",
//     password: ""
// });

  return (
    <form method="post" action="database-link-goes-here">
      <fieldset>
        <label htmlFor="nick-name">
          Enter Your NickName: 
          <input id="nick-name" type="text" required />
        </label>
        <label htmlFor="user-name">
          Enter Your User Name: 
          <input id="user-name" type="text" required />
        </label>
        <label htmlFor="email">
          Enter Your Email: 
          <input id="email" type="email" required />
        </label>
        <label htmlFor="new-password">
          Create a New Password: 
          <input
            id="new-password"
            type="password"
            pattern="[a-z0-9]{12,}"
            required
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>Account type (required)</legend>
        <label htmlFor="student-account">
          <input
            id="student-account"
            type="radio"
            name="account-type"
            defaultChecked
          />
          Student
        </label>
        <label htmlFor="mentor-account">
          <input
            id="mentor-account"
            type="radio"
            name="account-type"
          />
          Mentor
        </label>
      </fieldset>
    </form>
  );
};

export default SignupForm;


// e = event obj getting passed whenever form is submitted 
// const submitEvent = ();