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

export function SignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    nickname: '',
    username: '',
    email: '',
    accountType: 'mentor',
    password: '',
    stemField: ''
  });

  const stemFields = [
    'Computer Science',
    'Biology',
    'Chemistry',
    'Physics',
    'Math',
    'Engineering'
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle sign up logic
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        Nickname:
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <div>
        <label>
          <input
            type="radio"
            name="accountType"
            value="mentor"
            checked={formData.accountType === 'mentor'}
            onChange={handleChange}
          />
          Mentor
        </label>
        <label>
          <input
            type="radio"
            name="accountType"
            value="mentee"
            checked={formData.accountType === 'mentee'}
            onChange={handleChange}
          />
          Mentee
        </label>
      </div>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <label>
        STEM Field:
        <select name="stemField" value={formData.stemField} onChange={handleChange}>
          <option value="">Select a field</option>
          {stemFields.map(field => (
            <option key={field} value={field}>{field}</option>
          ))}
        </select>
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic
  };

  return (
    <div className="login-background">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <img src="/assets/Logo.png" alt="Logo" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

