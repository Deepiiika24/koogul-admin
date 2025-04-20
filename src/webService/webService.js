import API_URL from '../utils/url';

const getData = async (route, params = {}, token = null) => {
  try {
    const URL_ROUTE = `${API_URL}${route}`;
    const queryParams = new URLSearchParams(params).toString();
    const headers = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${URL_ROUTE}?${queryParams}`, { headers });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const postData = async (route, data, token = null, isFormData = false) => {
  try {
    const URL_ROUTE = `${API_URL}${route}`;
    const headers = {};
    
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(URL_ROUTE, {
      method: 'POST',
      headers,
      body: isFormData ? data : JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const putData = async (route, data, token = null, isFormData = false) => {
  try {
    const URL_ROUTE = `${API_URL}${route}`;
    const headers = {};
    
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(URL_ROUTE, {
      method: 'PUT',
      headers,
      body: isFormData ? data : JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const deleteData = async (route, token = null) => {
  try {
    const URL_ROUTE = `${API_URL}${route}`;
    const headers = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(URL_ROUTE, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export { getData, postData, putData, deleteData };