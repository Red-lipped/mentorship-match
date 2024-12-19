import React, { useState, useEffect, JSX } from 'react';
import users from '../../server/routes/users.js';


function UsersPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  interface User {
      nickName: String,
      userName: String,
      password: String,
      accountType: String,
      email: String,
      field: Array<string>,
  }
  
  function setSearchTerm(value: any) {
    // throw new Error('Function not implemented.');
  }

  useEffect(() => {
    // Fetch users from data source
    fetchUsers()
      .then((data: React.SetStateAction<any[]>) => setUsers(data))
      .catch((error: any) => console.error('Error fetching users:', error));
  }, []);

  const fetchUsers = () => {
    // Replace with data fetching logic
    fetch(`localhost:3000/users/`);
    };
  };

  const handleSearch = (event: { target: { value: any; }; }) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user: { name: string; email: string; }) => {
    const search = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search)
    );
  });

  return (
    <div>
      <h1>Users</h1>

      <input 
        type="text" 
        placeholder="Search users..." 
        value={searchTerm} 
        onChange={handleSearch} 
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;


function setSearchTerm(value: any) {
  throw new Error('Function not implemented.');
}

