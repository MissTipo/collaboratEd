import fetchData from "./utils/fetchChannelData";
import { initiateCall } from "./utils/peerConnection";

// Use env variable to set the url for production
const url = "http://localhost:5050/api";

// Action to create a channel
export const createChannel = async (dispatch, channel) => {
  dispatch({ type: "START_LOADING" });

  // send create channel request
  const data = await fetchData(
    { url: `${url}/create-channel`, method: "POST", body: channel },
    dispatch
  );
  if (data) {
    // handle channel creation success
    console.log("Channel created successfully:", data.channel);
    console.log(data);
    // Perform any necessary actions upon successful channel creation
  }
  dispatch({ type: "END_LOADING" });
};

// Action to fetch channels
export const fetchChannels = async (dispatch, groupId) => {
  dispatch({ type: "START_LOADING" });

  // send fetch channels request
  const data = await fetchData(
    { url: `${url}/get-channels`, method: "GET" },
    dispatch
  );
  if (data) {
    // handle successful channel fetching
    console.log(data.channels);
    // Perform any necessary actions with the fetched channels

    dispatch({ type: "SET_CHANNELS", payload: data.channels });
    return data.channels;
  }
  dispatch({ type: "END_LOADING" });
};

// action to join a vooice channel
export const joinVoiceChannel = async (dispatch, channelId, userId) => {
  dispatch({ type: "START_LOADING" });

  try {
    // Send join voice channel request
    const data = await fetchData(
      { url: `${url}/join-voice-channel`, method: "POST", body: { channelId, userId } },
      dispatch
    );

    if (data) {
      // Handle successful voice channel joining
      console.log("Joined voice channel successfully", data, channelId);
      // Perform any necessary actions upon successful voice channel joining

      dispatch({ type: "SET_VOICE_CHANNEL", payload: channelId });

      // initiate  the peer connection
      initiateCall(data.channelid);
    }
  } catch (error) {
    console.error("Error joining voice channel:", error);
    // Handle error if needed
  }

  dispatch({ type: "END_LOADING" });
};

// Action to delete a channel

export const deleteChannel = async (dispatch, channelId) => {
  dispatch({ type: "START_LOADING" });

  try {
    // Send delete channel request
    const data = await fetchData(
      { url: `${url}/delete-channel/${channelId}`, method: "DELETE" },
      dispatch
    );

    // Handle successful channel deletion
    if (data) {
      console.log("Channel deleted successfully");
      // Perform any necessary actions upon successful channel deletion
    }
  } catch (error) {
    console.error("Error deleting channel:", error);
    // Handle error if needed
  }

  dispatch({ type: "END_LOADING" });
};
