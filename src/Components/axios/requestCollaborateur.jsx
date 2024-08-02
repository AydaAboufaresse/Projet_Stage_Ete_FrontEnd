import axios from 'axios';

const BASEURL = 'http://localhost:8087/api/collaborateur/';

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
  await axios.delete(`${BASEURL}image/${filename}`);
}

async function saveCollaborateur(collaborateur, imageToUpload) {
  if (imageToUpload) {
    const imagePath = await uploadFile(imageToUpload);
    collaborateur.imageUrl = imagePath;
  }
  const response = await axios.post(BASEURL, collaborateur);
  return response.status;
}

async function updateCollaborateur(collaborateurObj, newImage) {
  if (newImage) {
    await deleteFile(collaborateurObj.imageUrl);
    const imagePath = await uploadFile(newImage);
    collaborateurObj.imageUrl = imagePath;
  }
  const response = await axios.put(`${BASEURL}${collaborateurObj.id}`, collaborateurObj);
  return response.status;
}

async function deleteCollaborateur(id, imagePath) {
  if (imagePath) {
    await deleteFile(imagePath);
  }
  await axios.delete(`${BASEURL}${id}`); // Assurez-vous que l'ID est correctement formaté
}


async function getAllData() {
  const response = await axios.get(BASEURL);
  return response.data;
}

export { BASEURL, getAllData, saveCollaborateur, deleteCollaborateur, updateCollaborateur };
