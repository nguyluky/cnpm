import multer from "multer";

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 100 * 1024 * 1024 // 10 MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "video/mp4") {
            return cb(new Error("Only mp4 videos are allowed"));
        }
        cb(null, true);
    }
})
