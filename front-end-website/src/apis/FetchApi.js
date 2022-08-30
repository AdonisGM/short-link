// const endpoint = 'http://localhost:3000';
const endpoint = 'https://short-link-adonisgm.azurewebsites.net';

/**
 * Fetches data from the API and returns a promise.
 * @param {object} api - The API endpoint.
 * @param {object} bodyObject - The body of the request.
 * @param {object} params - The parameters of the request.
 * @param {array<string>} pathValiable - The path variables of the request.
 * @returns {Promise<any>} - A promise that resolves to the response.
 */
 const FetchApi = async (api, bodyObject, params, pathValiable) => {
  console.log(123);
  let options = {
    method: api.method,
    headers: {
      'Content-Type': api.contextType,
      Authorization: localStorage.getItem('accessToken')
        ? 'Bearer ' + localStorage.getItem('accessToken')
        : '',
    },
    body: api.contextType === "multipart/form-data" ? bodyObject : bodyObject ? JSON.stringify(bodyObject) : null,
  };

  if (api.contextType === "multipart/form-data") {
    delete options.headers['Content-Type'];
  }

  let paramString = '?';
  for (const property in params) {
    if (params.hasOwnProperty(property)) {
      paramString += `${property}=${encodeURIComponent(params[property])}&`;
    }
  }

  let newUrl = api.url
  if (pathValiable != undefined && pathValiable.length > 0) {
    pathValiable.forEach((element, index) => {
      newUrl = newUrl.replace(`{${index}}`, element);
    });
  }

  let response = await fetch(`${endpoint}${newUrl}${paramString}`, options);

  if (response.status === 401) {
    const dataRefresh = await refreshToken();
    if (dataRefresh) {
      localStorage.setItem('accessToken', dataRefresh.data.accessToken);
      let optionsR = {
        method: api.method,
        headers: {
          'Content-Type': api.contextType,
          Authorization: localStorage.getItem('accessToken')
            ? 'Bearer ' + localStorage.getItem('accessToken')
            : '',
        },
        body: bodyObject ? JSON.stringify(bodyObject) : null,
      };
      response = await fetch(`${endpoint}${newUrl}${paramString}`, optionsR);
    }
  }

  if (response.status >= 500) {
    return Promise.reject(undefined);
  }

  if (!response.ok) {
    const errorData = await response.json();
    return Promise.reject(errorData);
  }

  const data = await response.json();
  return data;
};

const refreshToken = async () => {
  if (!localStorage.getItem('refreshToken')) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/';
    return null;
  }

  const optionsRefresh = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refreshToken: localStorage.getItem('refreshToken'),
    }),
    method: 'POST',
  };

  const responseRefresh = await fetch(
    `${endpoint}/api/auth/refresh-token`,
    optionsRefresh
  );

  if (!responseRefresh.ok) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/';
    return null;
  }

  const dataRefresh = await responseRefresh.json();
  return dataRefresh;
};

export default FetchApi;