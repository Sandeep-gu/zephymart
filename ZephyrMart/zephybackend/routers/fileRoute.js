const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

const fileFilter = (req,file,cb)=>{
    const fileExtension = file.originalname.split('.').pop().toLowerCase();
    if(fileExtension==='jpg' || fileExtension==='jpeg' || fileExtension==='png'){
        cb(null,true)
    }
    else{
        cb(null,false)
        cb(new Error("Only Valid jpg, jpeg, png"));
    }
}

const upload = multer({
    storage: storage,
    limits:{
        fileSize:1024*1024*10//1 MB limit
    },
    fileFilter:fileFilter
});

// Upload file route
router.post('/uploadFile', upload.single('file'), (req, res) => {
    if (req.file) {
        res.json({ filename: req.file.filename });
    } else {
        res.status(400).json({ message: 'No file uploaded' });
    }
});

const downloadFile = (req, res) => {
    const filename = req.params.filename;
    const path = __basedir + "/uploads/";

    res.download(path + filename, (error) => {
        if (error) {
            res.status(500).send({ message: "File cannot be downloaded " + error });
        }
    });
};

router.get('/files/:filename', downloadFile);

module.exports = router;
