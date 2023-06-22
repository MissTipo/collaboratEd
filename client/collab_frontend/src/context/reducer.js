const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_LOGIN":
      return { ...state, openLogin: true };
    case "CLOSE_LOGIN":
      return { ...state, openLogin: false };

    case "START_LOADING":
      return { ...state, loading: true };
    case "END_LOADING":
      return { ...state, loading: false };

    case "UPDATE_ALERT":
      return { ...state, alert: action.payload };

    case "UPDATE_USER":
      return { ...state, currentUser: action.payload };

    case "UPDATE_TOKEN":
      return { ...state, token: action.payload };

    case "CREATE_CHANNEL":
      return { ...state, channels: [...state.channels, action.payload] };

    case "SET_CHANNELS":
      return { ...state, channels: action.payload };

    case "UPDATE_CHANNEL":
      return {
        ...state,
        channels: state.channels.map((channel) =>
          channel._id === action.payload._id ? action.payload : channel
        ),
      };

    case "DELETE_CHANNEL":
      return {
        ...state,
        channels: state.channels.filter(
          (channel) => channel._id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default reducer;
