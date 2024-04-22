import { useCallback, useEffect, useState } from "react";
export const useApi = (
  {
    url,
    method = "GET",
    headers,
    body,
    callback,
    errorCallback,
    immediate = false,
  } = {
    url: null,
    method: null,
    headers: null,
    body: null,
    callback: null,
    errorCallback: null,
    immediate: false,
  },
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const sendRequest = useCallback(
    async (params) => {
      if (params) {
        url = params.url;
        method = params.method ? params.method : "GET";
        headers = params.headers;
        body = params.body;
        callback = params.callback;
        errorCallback = params.errorCallback;
      }

      setLoading(true);
      setError(null);

      headers = headers
        ? headers
        : typeof body === "object"
          ? { "Content-Type": "application/json" }
          : {};

      const option = {
        method,
        headers,
      };

      if (body) option.body = JSON.stringify(body);

      let response = null;

      try {
        response = await fetch(url, option);
        if (method !== "DELETE") {
          const result = await response.json();

          setData(result);
        } else setData(response);
      } catch (e) {
        setError(e);
        if (errorCallback) errorCallback(e);
      } finally {
        setLoading(false);
        if (response?.ok && callback) callback();
      }
    },
    [url, method, headers, body, callback, errorCallback],
  );

  useEffect(() => {
    if (immediate) sendRequest();
  }, [url]);

  return { sendRequest, data, loading, error };
};
