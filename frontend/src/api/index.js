const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API Request Failed');
  }

  return response.json();
};

export const venueApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/venues${query ? '?' + query : ''}`);
  },
  getOne: (id) => apiRequest(`/venues/${id}`),
  create: (data) => apiRequest('/venues', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/venues/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/venues/${id}`, { method: 'DELETE' }),
};

export const eventApi = {
  getAll: () => apiRequest('/events'),
  getByVenue: (venueId) => apiRequest(`/events/venue/${venueId}`),
  create: (data) => apiRequest('/events', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/events/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/events/${id}`, { method: 'DELETE' }),
};

export const userApi = {
  getAll: () => apiRequest('/users'),
  getOne: (id) => apiRequest(`/users/${id}`),
  create: (data) => apiRequest('/users', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/users/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id) => apiRequest(`/users/${id}`, { method: 'DELETE' }),
};

export const sensorApi = {
  getAll: () => apiRequest('/sensors'),
  create: (data) => apiRequest('/sensors', { method: 'POST', body: JSON.stringify(data) }),
  runDiagnostics: () => apiRequest('/sensors/diagnostics', { method: 'POST' }),
};

export const settingsApi = {
  get: () => apiRequest('/settings'),
  update: (data) => apiRequest('/settings', { method: 'PUT', body: JSON.stringify(data) }),
};
