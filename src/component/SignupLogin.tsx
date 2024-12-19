import React, { useState, ChangeEvent, FormEvent } from 'react';

interface SignupFormData {
  nickname: string;
  username: string;
  email: string;
  accountType: 'mentor' | 'mentee';
  password: string;
  stemField: string;
}

interface LoginFormData {
  username: string;
  password: string;
}

export default function SignupLoginPage() {
  const [signupData, setSignupData] = useState<SignupFormData>({
    nickname: '',
    username: '',
    email: '',
    accountType: 'mentor',
    password: '',
    stemField: ''
  });

  const [loginData, setLoginData] = useState<LoginFormData>({
    username: '',
    password: ''
  });

  const stemFields = [
    'Computer Science',
    'Biology',
    'Chemistry',
    'Physics',
    'Math',
    'Enviromental Engineering',
  ];

  const handleSignupChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignupSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // signup logic
  };

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // login logic
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
                checked={signupData.accountType === 'mentor'}
                onChange={handleSignupChange}
              />
              Mentor
            </label>
            <label>
              <input
                type="radio"
                name="accountType"
                value="mentee"
                checked={signupData.accountType === 'mentee'}
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
              {stemFields.map(field => (
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
