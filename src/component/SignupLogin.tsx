import React, { useState, ChangeEvent, FormEvent } from "react";

// This interface is necessary to declare the types in the SignupFormData object
interface SignupFormData {
  nickname: string;
  username: string;
  email: string;
  accountType: "mentor" | "mentee";
  password: string;
  stemField: string;
}
// This interface is necessary to declare the types in the LoginFormData object
interface LoginFormData {
  username: string;
  password: string;
}
// This interface is necessary to declare the types in the SignupLoginProps object
interface SignupLoginProps {
  onLoginSuccess?: () => void; // Add this prop so we can call it after login
}

// We create and export our SignupLoginPage component
export default function SignupLoginPage({ onLoginSuccess }: SignupLoginProps) {
  // Declaring default states and setter functions
  const [signupData, setSignupData] = useState<SignupFormData>({
    nickname: "",
    username: "",
    email: "",
    accountType: "mentor",
    password: "",
    stemField: "",
  });

  const [loginData, setLoginData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const stemFields = [
    "Biology",
    "Chemistry",
    "Computer Science",
    "Physics",
    "Math",
    "Enviromental Science",
    "Other",
  ];

  const handleSignupChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !signupData.nickname ||
      !signupData.username ||
      !signupData.email ||
      !signupData.password ||
      !signupData.stemField
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickName: signupData.nickname,
          userName: signupData.username,
          email: signupData.email,
          accountType: signupData.accountType,
          password: signupData.password,
          field: signupData.stemField,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Signup failed: ${errorData.message}`);
        return;
      }

      await response.json();
      alert("Signup successful! You can now log in.");

      setSignupData({
        nickname: "",
        username: "",
        email: "",
        accountType: "mentor",
        password: "",
        stemField: "",
      });
    } catch (error: any) {
      alert(`Request failed: ${error.message}`);
    }
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginData.username || !loginData.password) {
      alert("Please enter your username and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: loginData.username,
          password: loginData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message}`);
        return;
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        // Only call onLoginSuccess if it exists
        if (onLoginSuccess) onLoginSuccess();
      }

      setLoginData({ username: "", password: "" });
    } catch (error: any) {
      alert(`Request failed: ${error.message}`);
    }
  };

  return (
    <div className="forms-page">
      <div className="forms-container">
        <form className="signup-form" onSubmit={handleSignupSubmit}>
          <h2>Sign Up</h2>
          <label>
            Nickname:
            <input
              type="text"
              name="nickname"
              value={signupData.nickname}
              onChange={handleSignupChange}
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={signupData.username}
              onChange={handleSignupChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleSignupChange}
            />
          </label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="accountType"
                value="mentor"
                checked={signupData.accountType === "mentor"}
                onChange={handleSignupChange}
              />
              Mentor
            </label>
            <label>
              <input
                type="radio"
                name="accountType"
                value="mentee"
                checked={signupData.accountType === "mentee"}
                onChange={handleSignupChange}
              />
              Mentee
            </label>
          </div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleSignupChange}
            />
          </label>
          <label>
            STEM Field:
            <select
              name="stemField"
              value={signupData.stemField}
              onChange={handleSignupChange}
            >
              <option value="">Select a field</option>
              {stemFields.map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Sign Up</button>
        </form>

        <form className="login-form" onSubmit={handleLoginSubmit}>
          <h2>Log In</h2>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleLoginChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
            />
          </label>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}
