import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Fetching Teams from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched Teams:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [apiUrl]);

  const columns = teams.length > 0 ? Object.keys(teams[0]) : [];

  return (
    <div className="container mt-4">
      <h1 className="mb-4 display-6 fw-bold text-info">Teams</h1>
      <div className="card shadow">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-info">
                <tr>
                  {columns.map(col => (
                    <th key={col}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teams.map((team, idx) => (
                  <tr key={team.id || idx}>
                    {columns.map(col => (
                      <td key={col}>{typeof team[col] === 'object' ? JSON.stringify(team[col]) : team[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {teams.length === 0 && <div className="text-center text-muted">No teams found.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
