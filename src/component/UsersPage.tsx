import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';

//! Goals of this component: create simple list of Mentors, use searchbar to specify mentor.
// The interface is necessary to detail the types in the User object
interface User {
  _id: number;
  nickName: String;
  userName: String;
  password: String;
  accountType: String;
  email: String;
  field: Array<string>;
}
// This defines the fields in our drop-down menu
const stemFields = [
  'Computer Science',
  'Biology',
  'Chemistry',
  'Physics',
  'Math',
  'Environmental Engineering',
];

// This begins the definition of the component
function UsersPage() {
  // declaring default state and setter functions
  const [users, setUsers] = useState<User[]>([]); // Set type to User[]
  const [searchTerm, setSearchTerm] = useState<string>(''); // Define the type explicitly
  const [selectedField, setSelectedField] = useState<string>(''); // Dropdown selection

  // Async function allows us to fetch mentors from our server path
  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/page`); // /users/page
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const mentors = data.filter(
        (user: User) => user.accountType.toLowerCase() === 'mentor'
      );
      setUsers(mentors); // <-- fetch Mentors only
      // setUsers(data); // <-- Updates the state with fetched data
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch users when the component is mounted
  useEffect(() => {
    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once

  // When the client interacts with the search bar, we will target the input value
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

    // When the client interacts with the drop down menu, we will target the input value
  const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedField(event.target.value);
  };

  // Logic to ensure client views information based on the specified terms they search for
  const filteredUsers = users.filter((user: User) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      user.nickName.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) || //include every criteria searchable in the Mongoose schema
      user.userName.toLowerCase().includes(search);
    // user.accountType.toLowerCase() === 'mentor'
    const matchesField =
      selectedField === '' || user.field.includes(selectedField);

    return matchesSearch && matchesField;
  });

  return (
    <div>
      <h1>Find your mentor</h1>

      <div className='searchbar-container'>
        <input
          type='text'
          placeholder='Search users...'
          value={searchTerm}
          onChange={handleSearch}
          className='search-bar'
        />

        {/* Dropdown for STEM fields */}
        <select value={selectedField} onChange={handleFieldChange} className='field-dropdown'>
          <option value=''>All Fields</option>
          {stemFields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>

      <div className='user-content'>
        <div className='user-list'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.nickName}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* random inspirational quote*/}
        <div className='quote'>
          <h4>
            "Sometimes I'll start a sentence and I don't even know where it's
            going. I just hope I find it along the way."
          </h4>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
