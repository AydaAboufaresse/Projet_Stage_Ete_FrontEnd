import axios from 'axios';

// Base URL for the API
const BASEURL = 'http://localhost:8087/api/missions';

// Function to save a mission
async function saveMission(mission) {
  console.log('Mission data being sent:', mission);
  try {
    if (mission.vehicule_id) {
      mission.vehicule_id = String(mission.vehicule_id);
    }
    const response = await axios.post(`${BASEURL}`, mission);
    console.log('Save response status:', response.status);
    return response.status;
  } catch (error) {
    console.error('Error saving mission:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Function to update a mission
async function updateMission(missionObj) {
  try {
    const response = await axios.put(`${BASEURL}/${missionObj.id}`, missionObj);
    console.log('Update response status:', response.status);
    return response.status;
  } catch (error) {
    console.error('Error updating mission:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Function to delete a mission
async function deleteMission(id) {
  try {
    const response = await axios.delete(`${BASEURL}/${id}`);
    console.log('Delete response status:', response.status);
    return response.status;
  } catch (error) {
    console.error('Error deleting mission:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Function to get all missions
async function getAllMissions() {
  try {
    const response = await axios.get(`${BASEURL}`);
    console.log('Fetch response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching missions:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export { BASEURL, saveMission, updateMission, deleteMission, getAllMissions };