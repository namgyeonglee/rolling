import { useEffect, useState } from "react";

export function useScript(src, option) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let script = document.querySelector(`script[src="${src}"]`);

    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      if (option) {
        const keys = Object.keys(option);
        keys.forEach((key) => {
          script[key] = option[key];
        });
      }
    }

    const handleLoad = () => setLoading(false);
    const handleError = () => setError(error);

    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);

    document.body.appendChild(script);

    return () => {
      if (script) {
        script.removeEventListener("load", handleLoad);
        script.removeEventListener("error", handleError);
        document.body.removeChild(script);
      }
    };
  }, [src]);

  return [loading, error];
}
