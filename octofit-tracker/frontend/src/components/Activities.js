import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Fetching Activities from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched Activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [apiUrl]);

  // Determine table columns dynamically if possible
  const columns = activities.length > 0 ? Object.keys(activities[0]) : [];

  return (
    <div className="container mt-4">
      <h1 className="mb-4 display-6 fw-bold text-primary">Activities</h1>
      <div className="card shadow">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  {columns.map(col => (
                    <th key={col}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, idx) => (
                  <tr key={activity.id || idx}>
                    {columns.map(col => (
                      <td key={col}>{typeof activity[col] === 'object' ? JSON.stringify(activity[col]) : activity[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {activities.length === 0 && <div className="text-center text-muted">No activities found.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
