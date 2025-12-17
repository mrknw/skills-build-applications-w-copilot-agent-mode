import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Fetching Users from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched Users:', results);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [apiUrl]);

  const columns = users.length > 0 ? Object.keys(users[0]) : [];

  return (
    <div className="container mt-4">
      <h1 className="mb-4 display-6 fw-bold text-warning">Users</h1>
      <div className="card shadow">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-warning">
                <tr>
                  {columns.map(col => (
                    <th key={col}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user.id || idx}>
                    {columns.map(col => (
                      <td key={col}>{typeof user[col] === 'object' ? JSON.stringify(user[col]) : user[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && <div className="text-center text-muted">No users found.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
