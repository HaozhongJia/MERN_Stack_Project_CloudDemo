import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

const BearerToken = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).token
    : false;
const Headers = () => {
  return {
    headers: {
      token: `Bearer ${BearerToken()}`,
    },
  };
};

export const getAllCategory = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/category/all-category`, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async ({
  cName,
  cImage,
  cDescription,
  cStatus,
}) => {

  // Upload file to cloudinary
  let imageUrl;
  async function uploadImage(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "qis0uzfs");
    const res = await fetch(
        `https://api.cloudinary.com/v1_1/dug9no5ta/image/upload`,
        {
          method: "POST",
          body: data,
        }
    );
    const img = await res.json();
    //console.log(img)
    imageUrl = img.url;
  }

  await uploadImage(cImage);
  //console.log(imageUrl);


  let formData = new FormData();
  formData.append("cImage", imageUrl);
  formData.append("cName", cName);
  formData.append("cDescription", cDescription);
  formData.append("cStatus", cStatus);

  try {
    let res = await axios.post(
      `${apiURL}/api/category/add-category`,
      formData,
      Headers()
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editCategory = async (cId, des, status) => {
  let data = { cId: cId, cDescription: des, cStatus: status };
  try {
    let res = await axios.post(
      `${apiURL}/api/category/edit-category`,
      data,
      Headers()
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (cId) => {
  try {
    let res = await axios.post(
      `${apiURL}/api/category/delete-category`,
      { cId },
      Headers()
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
