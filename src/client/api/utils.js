import fetch from "unfetch";

export const API_PATH = `${process.env.API_URL}`;

const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";

export function get(path, headers) {
  return req(path, GET, undefined, headers);
}

export function post(path, body, headers) {
  return req(path, POST, body, headers);
}

export function put(path, body, headers) {
  return req(path, PUT, body, headers);
}

export function del(path, headers) {
  return req(path, DELETE, undefined, headers);
}

function req(path, method, body, headers) {
  const contentTypeHeader = method
    ? { "Content-Type": "application/json" }
    : null;
  return fetch(`${API_PATH}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      ...contentTypeHeader,
      ...headers
    },
    body: body ? JSON.stringify(body) : null
  })
    .then(checkStatus)
    .then(async r => {
      const text = await r.text();
      return text ? JSON.parse(text) : null;
    })
    .then(checkApiStatus);
}

export class ApiError extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}

export function checkStatus(response) {
  if (response.ok) {
    return response;
  }

  const error = new ApiError(response.statusText, response);
  return Promise.reject(error);
}

export function checkApiStatus(response) {
  if (
    response.status !== "failure" &&
    response.status !== "error" &&
    response.status !== "faillure"
  ) {
    return response;
  }

  const error = new ApiError(response.reason, response);
  return Promise.reject(error);
}
