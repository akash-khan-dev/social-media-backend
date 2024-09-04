const fs = require("fs");

removeItem = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

const uploadImageMiddleware = async (req, res, next) => {
  try {
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(404).json({ message: "file not selected" });
    }

    const file = Object.values(req.files).flat();
    file.forEach((files) => {
      if (
        files.mimetype !== "image/jpeg" &&
        files.mimetype !== "image/jpg" &&
        files.mimetype !== "image/png" &&
        files.mimetype !== "image/gif" &&
        files.mimetype !== "image/webp"
      ) {
        removeItem(files.tempFilePath);
        return res.status(404).json({ message: "Unsupported file" });
      } else if (files.size > 1024 * 1024 * 5) {
        removeItem(files.tempFilePath);
        return res.status(404).json({ message: "file size is too large" });
      }
    });
    next();
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};
module.exports = uploadImageMiddleware;
