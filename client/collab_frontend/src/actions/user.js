// import fetchData from "./utils/fetchData";
import fetchData from "./utils/fetchData";

// User related actions

// Use env variable to set the url for production
const url = "http://localhost:5050/api";

// Action to register a new user
export const register = async (dispatch, user) => {
  dispatch({ type: "START_LOADING" });

  // send register request
  const data = await fetchData(
    { url: `${url}/register`, body: user },
    dispatch
  );
  if (data) {
    dispatch({ type: "UPDATE_USER", payload: data.user });
    dispatch({ type: "CLOSE_LOGIN" });
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Registered successfully",
      },
    });
  }
  dispatch({ type: "END_LOADING" });
};

// Action to login a user
export const login = async (dispatch, user) => {
  dispatch({ type: "START_LOADING" });

  // send login request
  const data = await fetchData({ url: `${url}/login`, body: user }, dispatch);
  if (data) {
    // update the user and token
    dispatch({ type: "UPDATE_TOKEN", payload: data.token });
    // console.log(data.token);
    dispatch({ type: "UPDATE_USER", payload: data.user });
    dispatch({ type: "CLOSE_LOGIN" });
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Logged in successfully",
      },
    });
  }
  dispatch({ type: "END_LOADING" });
};
