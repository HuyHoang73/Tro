// const API_DOMAIN = "http://localhost:3005/";
const API_DOMAIN = "http://3.27.67.165:8081/api/v1/";

export const get = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, options);
  const result = await response.json();
  return result;
};

export const post = async (path, options, useMultipart = false) => {
  const body = useMultipart ? new FormData() : JSON.stringify(options);
  if (useMultipart)
    Object.entries(options).forEach(([key, value]) => body.set(key, value));

  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: useMultipart
      ? void 0
      : {
          "Content-Type": "application/json",
        },
    body,
  });
  const result = await response.json();
  return result;
};

export const del = async (path) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "DELETE",
  });
  const result = await response.json();
  return result;
};

export const patch = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};
