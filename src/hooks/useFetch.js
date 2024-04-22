import { useEffect, useState } from "react";

export const useFetch = ({ url, errorCallback }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const response = await fetch(url, { method: "GET" });
        const result = await response.json();

        setData(result);
      } catch (e) {
        setError(e);
        if (errorCallback) errorCallback(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, loading, error };
};

export const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const sendRequest = async ({
    url,
    method,
    headers,
    body,
    callback,
    errorCallback,
  }) => {
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
  };

  return [sendRequest, data, loading, error];
};

/*
export const useApi = ({
  a, // 처음에 바로 호출할지 여부
  url,
  method,
  headers,
  body,
  callback,
  errorCallback,
}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (a) sendRequest();
  }, [a]);
  const sendRequest = async () => {
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
  };

  return [sendRequest, data, loading, error];
};
*/
