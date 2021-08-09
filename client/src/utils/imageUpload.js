const CONFIG_CLOUDINARY = {
  upload_preset: "social-media",
  cloud_name: "ninhbui1203",
};
async function imageUpload(images) {
  let imgArr = [];
  const urlCloud = `https://api.cloudinary.com/v1_1/${CONFIG_CLOUDINARY.cloud_name}/image/upload`;
  for (const item of images) {
    const formData = new FormData();
    formData.append("file", item);

    formData.append("upload_preset", CONFIG_CLOUDINARY.upload_preset);

    const res = await fetch(urlCloud, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => data);
    imgArr.push({ public_id: res.public_id, url: res.secure_url });
  }
  return imgArr;
}

export default imageUpload;
