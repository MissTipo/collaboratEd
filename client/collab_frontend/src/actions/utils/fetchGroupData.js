const fetchGroupData = async ({ url, method = "POST", token = "", body = null }, dispatch) => {
  // Set headers
  const headers = token
    ? { "content-type": "application/json", Authorization: `Bearer ${token}` }
    : { "content-type": "application/json" };

  // Set body
  body = body ? JSON.stringify(body) : null;
  try {
    // Make the request
    const response = await fetch(url, { method, headers, body });
    console.log(response)
    //const data = await response.json();

    /*if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || response.statusText);
    }*/

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || response.statusText;
      throw new Error(errorMessage);
    }

    const data = await response.json();

    //if (response.status !== 200) throw new Error(data.message)

    /**if (!data.success) {
      if (response.status === 401) {
        dispatch({ type: "UPDATE_CHANNEL", payload: null });
        throw new Error(data.error);
      } else if (response.status === 400) {
        throw new Error(data.error);
      }
    }**/

    return data;
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: error.message,
      },
    });
    throw error;
  }
};

export default fetchGroupData;

