import React, { useState, useEffect } from 'react';  

interface User {
  _id : number,
  nickName: String,
  userName: String,
  password: String,
  accountType: String,
  email: String,
  field: Array<string>,
}

function UsersPage() {  
  const [users, setUsers] = useState<User[]>([]); // Set type to User[]  
  const [searchTerm, setSearchTerm] = useState<string>(''); // Define the type explicitly  

  useEffect(() => {  
    // Fetch users from data source  
    fetchUsers()  
      .then((data: User[]) => setUsers(data))  
      .catch((error: any) => console.error('Error fetching users:', error));  
  }, []);  

  const fetchUsers = async () => { // Changed to async function  
    const response = await fetch(`http://localhost:3000/users/`); // Added http:// and corrected CORS  
    if (!response.ok) {  
      throw new Error('Network response was not ok');  
    }  
    return response.json(); // Assuming the server returns users as JSON  
  };  

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {  
    setSearchTerm(event.target.value);  
  };  

  const filteredUsers = users.filter((user: User) => {  
    const search = searchTerm.toLowerCase();  
    return (  
      user.nickName.toLowerCase().includes(search) ||  
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
            <tr key={user._id}>  
              <td>{user.nickName}</td>  
              <td>{user.email}</td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  
    </div>  
  );  
}  

export default UsersPage;