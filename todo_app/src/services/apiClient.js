const API_URL = import.meta.env.VITE_API_URL;

const apiClient = async (endpoint, options = {}) => {
  const {
    token,
    body,
    headers = {},
    ...restOptions
  } = options;

  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...restOptions,
      headers: {
        'Content-Type': 'application/json',
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
        ...headers,
      },
      ...(body && {
        body: JSON.stringify(body),
      }),
    });
  } catch (error) {
    throw new Error(
      'Unable to connect to the server. Please try again.'
    );
  }

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message || 'Something went wrong'
    );
  }

  return data;
};

export default apiClient;