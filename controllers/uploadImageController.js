const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// cloudinady upload functionality

const uploadImageCloudenary = async (path, file) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
      },
      (err, res) => {
        if (err) {
          removeItem(file.tempFilePath);
          return res.status(404).json({ message: "file  upload field" });
        }
        resolve({
          url: res.secure_url,
        });
      }
    );
  });
};

removeItem = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

exports.uploadImageController = async (req, res) => {
  try {
    const { path } = req.body;
    const files = Object.values(req.files).flat();
    const image = [];

    for (const file of files) {
      const url = await uploadImageCloudenary(path, file);
      image.push(url);
      removeItem(file.tempFilePath);
    }
    return res.status(200).json({ data: image });
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};
exports.imageList = async (req, res, next) => {
  try {
    const { path, sort, max } = req.body;
    cloudinary.v2.search
      .expression(`${path}`)
      .sort_by("public_id", `${sort}`)
      .max_results(max)
      .execute()
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        return res.json({ message: err.message });
      });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
