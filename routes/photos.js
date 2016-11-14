const Photo = require("../models/Photo");
const multer = require('multer');
const Path = require("path")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, Path.join(__dirname, '../public/photos'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
const upload = multer({ storage });
const router = require("express").Router();

function list(req, res, next) {
  Photo.find({}, function(err, photos) {
    if(err) return next(err);
    res.render("photos", {
      title: "Photos",
      photos
    });
  });
}

function form(req, res) {
  res.render("photos/upload", {
    title: "Photo upload"
  });
}

function submit(req, res, next) {
  const name = req.file.filename;
  const path = req.file.path.match(/public\/photos\/(.+)/).shift();
  Photo.create({ name, path }, onCreate);

  function onCreate(err) {
    if(err) return next(err);
    res.redirect("/photos");
  }
}

function download(req, res, next) {
  const id = req.params.id;
  Photo.findById(id, onFind);

  function onFind(err, photo) {
    if(err) return next(err);
    const path = Path.join(__dirname,"../", photo.path);
    res.sendFile(path);
  }
}

router.get("/", list);
router.get("/:id/download", download);
router.get("/upload", form);
router.post("/upload", upload.single("photo[image]"), submit);
module.exports = router;
