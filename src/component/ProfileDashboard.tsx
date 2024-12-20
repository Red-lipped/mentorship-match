import { useEffect, useState } from "react";
import Avatar from '../../public/assets/avatarplaceholder.jpg'

// The interface is necessary to detail the types in the User object
interface User {
  _id: number;
  nickName: string;
  userName: string;
  password: string;
  accountType: string;
  email: string;
  field: string[];
}

export default function Forum() {
    // declaring default states and setter fucntions
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

    // this allows us to update our page based on the user date we receive
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // JWT stored in React local storage to be used during the session
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:8080/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Failed to fetch user data.");
        }

        const user: User = await response.json();
        // We reset the states
        setUserData(user);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

//   Conditional Rendering Logic
  if (loading)
    return (
      <div className="dashboard">
        <h1>Loading user data...</h1>
      </div>
    );
  if (error)
    return (
      <div className="dashboard">
        <h1>Error: {error}</h1>
      </div>
    );

  if (!userData)
    return (
      <div className="dashboard">
        <h1>No user data found.</h1>
      </div>
    );

    // HTML elements rendered to the page
  return (
    <div className="dashboard">
      <h1>Profile Dashboard</h1>
      <img src={Avatar} alt="profile" />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Account Type</th>
            <th>STEM Field</th>
          </tr>
        </thead>
        <tbody>
          <tr key={userData._id}>
            <td>{userData.nickName}</td>
            <td>{userData.userName}</td>
            <td>{userData.email}</td>
            <td>{userData.accountType}</td>
            <td>{userData.field.join(", ")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
