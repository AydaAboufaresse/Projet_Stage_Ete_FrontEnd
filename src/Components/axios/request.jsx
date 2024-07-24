import axios from 'axios';

const BASEURL = 'http://localhost:8087/api/';

async function uploadFile(file) {
  const formData = new FormData();
  
  formData.append('file', file);
  const response = await axios.post(`${BASEURL}upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}

async function deleteFile(filename) {
  await axios.delete(`${BASEURL}delete`, {
    params: { filename }
  });
}

async function saveVehicule(vehicule, imagetoUpload) {
  if (imagetoUpload) {
    const imagePath = await uploadFile(imagetoUpload);
    vehicule.vehiculeImageUrl = imagePath;
  }
  const response = await axios.post(`${BASEURL}vehicule`, vehicule);
  return response.status;
}

async function updateVehicule(vehiculeObj, newImage) {
  if (newImage) {
    await deleteFile(vehiculeObj.vehiculeImageUrl);
    const imagePath = await uploadFile(newImage);
    vehiculeObj.vehiculeImageUrl = imagePath;
  }
  const response = await axios.put(`${BASEURL}vehicule/${vehiculeObj.vehiculeId}`, vehiculeObj);
  return response.status;
}

async function deleteVehicule(id, imagePath) {
  await deleteFile(imagePath);
  await axios.delete(`${BASEURL}vehicule/${id}`);
}

async function GetAllData() {
  const response = await axios.get(`${BASEURL}`);
  return response.data;
}

export { BASEURL, GetAllData, saveVehicule, deleteVehicule, updateVehicule };
