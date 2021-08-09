function validUploadImage(file) {
  let err = "";
  if (!file) return (err = "File upload does not exits.");
  if (file.size > 1024 * 1024) err = "Max file size is 1MB.";
  if (
    !(
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    )
  )
    err = "File type is incorrect.";
  return err;
}

export default validUploadImage;
