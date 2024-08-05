import { useState, useEffect } from "react";

export default function useAppFormPost(ms?: number) {
  const [loadingCount, setLoadingCount] = useState(0);

  function increaseActions() {
    setLoadingCount((prev) => {
      const r = prev + 1;
      return r >= 1 ? r : 1;
    });
  }

  function decreaseActions() {
    setLoadingCount((prev) => {
      const r = prev - 1;
      return r >= 0 ? r : 0;
    });
  }

  async function postData<T = any>({ formData, url }: { formData: any; url: string }) {
    try {
      increaseActions();
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = (await res.json()) as T;
      decreaseActions();
      return data;
    } catch (error) {
      decreaseActions();
      throw error;
    }
  }

  return { postData, isBusy: loadingCount > 0 };
}
