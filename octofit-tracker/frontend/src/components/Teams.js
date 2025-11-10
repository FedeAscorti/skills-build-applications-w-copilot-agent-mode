import React, { useEffect, useState, useCallback } from 'react';

function Teams() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const buildEndpoint = () => {
    const name = process.env.REACT_APP_CODESPACE_NAME;
    const base = name ? `https://${name}-8000.app.github.dev` : 'http://localhost:8000';
    return `${base}/api/teams/`;
  };

  const fetchData = useCallback(() => {
    const endpoint = buildEndpoint();
    console.log('[Teams] Fetching from endpoint:', endpoint);
    setLoading(true);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('[Teams] fetched data:', data);
        const list = Array.isArray(data) ? data : data.results || data;
        setItems(list || []);
      })
      .catch((err) => {
        console.error('[Teams] fetch error:', err);
        setError(err.message || 'Fetch error');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const headers = items && items.length ? Object.keys(items[0]) : [];

  return (
    <div className="card app-card">
      <div className="card-body">
        <h3 className="card-title">Teams</h3>
        <div className="mb-2">
          <button className="btn btn-primary me-2" onClick={fetchData}>
            Refresh
          </button>
        </div>

        {loading && (
          <div className="mb-2">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && <div className="alert alert-danger">Error: {error}</div>}

        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                {headers.length ? headers.map((h) => <th key={h}>{h}</th>) : <th>Data</th>}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items && items.length ? (
                items.map((item, idx) => (
                  <tr key={item.id || idx}>
                    {headers.length
                      ? headers.map((h) => <td key={h}>{String(item[h] ?? '')}</td>)
                      : <td>{JSON.stringify(item)}</td>}
                    <td>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => setSelected(item)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={headers.length ? headers.length + 1 : 2}>No teams found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selected && (
          <>
            <div className="modal-backdrop-custom" onClick={() => setSelected(null)} />
            <div className="modal modal-custom d-block" tabIndex={-1}>
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Team details</h5>
                    <button type="button" className="btn-close" onClick={() => setSelected(null)} />
                  </div>
                  <div className="modal-body">
                    <pre>{JSON.stringify(selected, null, 2)}</pre>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setSelected(null)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Teams;
