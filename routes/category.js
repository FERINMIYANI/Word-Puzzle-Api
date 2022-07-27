var express = require('express');
var router = express.Router();
const multer = require('multer')

let categoryController = require('../Controller/CategoryController')
let authController = require('../Controller/AuthController')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })



// --------------------------------------------------------Auth--------------------------------------------
router.post('/login', authController.login)
router.post('/addadmin', authController.addAdmin)



// ----------------------------------insert update delete category-----------------------------------

router.post('/addcategory', authController.protect, upload.fields([{ name: 'icon', maxCount: 1 }, { name: 'background', maxCount: 1 }]), categoryController.createCategory);
router.post('/update', authController.protect, upload.fields([{ name: 'icon', maxCount: 1 }, { name: 'background', maxCount: 1 }]), categoryController.updateCategory);
router.get('/delete', authController.protect, categoryController.deleteCategory);
router.get('/allcategory', authController.protect, categoryController.allCategory);



// -------------------------------------------------------adding levels to category----------------------------------
router.post('/addlevel', authController.protect, upload.array('image', 12), categoryController.addLevel)
router.post('/updatelevel', authController.protect, upload.array('image', 12), categoryController.updateLevel)
router.get('/viewlevel', authController.protect, categoryController.viewLevel)
router.get('/level', authController.protect, categoryController.level)
router.get('/deletelevel', authController.protect, categoryController.deleteLevel)


// ------------------------------------updateWord--------------------------------------------
router.post('/updateword', authController.protect, upload.single('image'), categoryController.updateWord)
router.post('/addword', authController.protect, upload.single('image'), categoryController.addWord)
router.post('/deleteword', authController.protect, categoryController.deleteWord)
// router.get('/deleteword', categoryController.deleteWord)

module.exports = router;