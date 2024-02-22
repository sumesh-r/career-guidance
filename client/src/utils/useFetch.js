async function UseFetch(method, url, body) {
  let config = {
    method: "GET",
    credentials: "include",
  };

  if (method === "POST") {
    config = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
  }
  const response = await fetch(url, config).then(async function (res) {
    const status = res.status;
    const data = await res.json();
    if (status === 401) {
      localStorage.removeItem("user");
    }
    return {
      data,
      status,
    };
  });
  return response;
}

export default UseFetch;
