import fetchGroupData from "./utils/fetchGroupData";
// Use env variable to set the url for production
const url = "http://localhost:5050/api";

// Action to create a group
export const createGroup = async (dispatch, group) => {
  dispatch({ type: "START_LOADING" });

  // send create group request
  const data = await fetchGroupData(
    { url: `${url}/create-group`, method: "POST", body: group },
    dispatch
  );
  if (data) {
    console.log(data)
    // handle group creation success
    console.log("Group created successfully:", data.group);
    console.log(data);
    // Perform any necessary actions upon successful group creation
  }
  dispatch({ type: "END_LOADING" });
};

// Action to fetch groups
export const fetchGroups = async (dispatch) => {
  dispatch({ type: "START_LOADING" });

  // send fetch groups request
  const data = await fetchGroupData(
    { url: `${url}/get-groups`, method: "GET" },
    dispatch
  );
  if (data) {
    // handle successful group fetching
    console.log(data.groups);
    // Perform any necessary actions with the fetched groups

    dispatch({ type: "SET_GROUPS", payload: data.groups });
    return data.groups;
  }
  dispatch({ type: "END_LOADING" });
};

// Action to join a group
export const joinGroup = async (dispatch, groupId, userId) => {
  dispatch({ type: "START_LOADING" });

  try {
    // Send join group request
    const data = await fetchGroupData(
      { url: `${url}/join-group`, method: "POST", body: { groupId, userId } },
      dispatch
    );

    if (data) {
      // Handle successful group joining
      console.log("Joined group successfully", data, groupId);
      // Perform any necessary actions upon successful group joining

      dispatch({ type: "SET_CURRENT_GROUP", payload: groupId });
    }
  } catch (error) {
    console.error("Error joining group:", error);
    // Handle error if needed
  }

  dispatch({ type: "END_LOADING" });
};

// Action to delete a group
export const deleteGroup = async (dispatch, groupId) => {
  dispatch({ type: "START_LOADING" });

  try {
    // Send delete group request
    const data = await fetchGroupData(
      { url: `${url}/delete-group/${groupId}`, method: "DELETE" },
      dispatch
    );

    // Handle successful group deletion
    if (data) {
      console.log("Group deleted successfully");
      // Perform any necessary actions upon successful group deletion
    }
  } catch (error) {
    console.error("Error deleting group:", error);
    // Handle error if needed
  }

  dispatch({ type: "END_LOADING" });
};

