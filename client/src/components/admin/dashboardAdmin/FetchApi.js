import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const DashboardData = async () => {
  try {
    let res = await axios.post(`${apiURL}/api/customize/dashboard-data`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSliderImages = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/customize/get-slide-image`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postUploadImage = async (formData) => {
  try {
    //console.log("formdata: ", formData.get("image"));

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

    await uploadImage(formData.get("image"));
    //console.log("imageUrl: ", imageUrl);

    let res = await axios.post(
      `${apiURL}/api/customize/upload-slide-image`,
      //formData
        {imageUrl}
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postDeleteImage = async (id) => {
  try {
    let res = await axios.post(`${apiURL}/api/customize/delete-slide-image`, {
      id,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
