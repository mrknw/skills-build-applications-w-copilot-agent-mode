import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching Leaderboard from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboard(results);
        console.log('Fetched Leaderboard:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [apiUrl]);

  const columns = leaderboard.length > 0 ? Object.keys(leaderboard[0]) : [];

  return (
    <div className="container mt-4">
      <h1 className="mb-4 display-6 fw-bold text-success">Leaderboard</h1>
      <div className="card shadow">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-success">
                <tr>
                  {columns.map(col => (
                    <th key={col}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, idx) => (
                  <tr key={entry.id || idx}>
                    {columns.map(col => (
                      <td key={col}>{typeof entry[col] === 'object' ? JSON.stringify(entry[col]) : entry[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {leaderboard.length === 0 && <div className="text-center text-muted">No leaderboard data found.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
