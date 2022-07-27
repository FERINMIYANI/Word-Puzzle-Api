let Category = require('../Model/Category')


// ---------------------------------------------------------------------INSERT-----------------------------
exports.createCategory = async function (req, res, next) {
    try {
        let data = { ...req.body }
        // console.log("files",req.files);
        if (!data || !req.files) {
            throw new Error("No data Found")
        }
        data.icon = req.files.icon[0].filename
        data.background = req.files.background[0].filename
        // console.log(data);
        if (!data.background || !data.icon) {
            throw new Error("Background Image and Icon image not found")
        }
        let details = await Category.create(data)
        return res.status(200).json({
            message: "Data created successfully",
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

// ---------------------=-----------------------------------------------------UPDATE------------------------------------------

exports.updateCategory = async function (req, res, next) {
    try {
        let data = { ...req.body }
        console.log(data);
        let id = req.query.id
        if (!data || !req.files || !id) {
            throw new Error("data or Id Was Not Found")
        }
        if (req.files.icon) {
            data.icon = req.files.icon[0].filename
        }
        if (req.files.background) {
            data.background = req.files.background[0].filename
        }
        let details = await Category.findByIdAndUpdate(id, { $set: data })
        return res.status(200).json({
            message: "Data created successfully",
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}


// --------------------------------------------------------------------------------------------DELETE-------------------------------------

exports.deleteCategory = async function (req, res, next) {
    try {
        let id = req.query.id
        console.log(id);
        if (!id) {
            throw new Error("Id Was Not Found")
        }
        await Category.findByIdAndDelete(id)
        return res.status(200).json({
            message: "Data deleted successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.allCategory = async function (req, res, next) {
    try {
        let details = await Category.find()
        return res.status(200).json({
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}





// --------------------------------------------------------------------------------ADD LEVEL-------------------------------

exports.addLevel = async function (req, res, next) {
    try {
        let id = req.query.id
        let data = { ...req.body }
        if (!data || !id) {
            throw new Error("Id Or No Input Value Found")
        }
        let wordArray = []
        for (let i = 0; i < req.files.length; i++) {
            let imageData = {
                image: req.files[i].filename,
                word: (data.word.length > 1 && data.word ? data.word[i] : data.word)
            }

            wordArray.push(imageData)
        }
        let details = {
            spellings: [...wordArray]
        }
        if (!req.files) {
            throw new Error("Image was not Found")
        }
        await Category.findByIdAndUpdate(id, { $push: { 'levels': details } })
        return res.status(200).json({
            message: "New Level Was Added"
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.updateLevel = async function (req, res, next) {
    try {
        let id = req.query.id
        let data = { ...req.body }

        if (!id) {
            throw new Error("Id was Not Found")
        }
        if (req.file) {
            data.image = req.file.filename
            await Category.findByIdAndUpdate(id)
        }
        await Category.findByIdAndUpdate(id)
        return res.status(200).json({
            message: "Level Updated successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.deleteLevel = async function (req, res, next) {
    try {
        // let data = {...req.body}
        let dataid = req.query.dataid
        let id = req.query.id
        if (!id) {
            throw new Error("Id Was Not Found")
        }
        await Category.findByIdAndUpdate(id, { $pull: { 'levels': { '_id': dataid } } })
        return res.status(200).json({
            message: "Deleted spellings SuccessFully"
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.updateWord = async function (req, res, next) {
    try {
        let id = req.query.id
        console.log(req.body);
        if (!id) {
            throw new Error('Id Was Not Found')
        }
        if (req.file) {
            let wordImage = req.file.filename
            await Category.findByIdAndUpdate(id, { $set: { 'levels.$[a].spellings.$[b].image': wordImage } }, { "arrayFilters": [{ 'a._id': req.body.levelId }, { 'b._id': req.body.wordId }] })
        }
        if (req.body.word) {
            await Category.findByIdAndUpdate(id, { $set: { 'levels.$[a].spellings.$[b].word': req.body.word } }, { "arrayFilters": [{ 'a._id': req.body.levelId }, { 'b._id': req.body.wordId }] })
        }
        return res.status(200).json({
            message: req.body
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.viewLevel = async function (req, res, next) {
    try {
        let id = req.query.id
        // console.log(id);
        if (!id) {
            throw new Error('Id Was Not Found')
        }
        let details = await Category.findById(id)
        if (!details) {
            throw new Error("Details Not Found")

        }
        return res.status(200).json({
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}



// exports.deleteLevel = async function (req, res, next) {
//     try {
//         let id = req.query.id
//         let dataId = req.query.dataid
//         if (!id) {
//             throw new Error('Id Was Not Found')
//         }
//         await Category.findByIdAndUpdate(id, { $pull: { 'levels': dataId } })

//         return res.status(200).json({
//             message: "Data Deleted Successfully"
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(404).json({
//             message: error.message
//         })
//     }
// }


exports.level = async function (req, res, next) {
    try {
        let id = req.query.id
        if (!id) {
            throw new Error('Id Was Not Found')
        }
        let details = await Category.findById(id)
        return res.status(200).json({
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.addWord = async function (req, res, next) {
    try {
        let id = req.query.id
        if (!id) {
            throw new Error("Id or Data Was Not Found")
        }
        if (!req.file) {
            throw new Error("Image was Not Found")
        }
        console.log(req.body);
        let data = {
            word: req.body.word,
            image: req.file.filename
        }
        await Category.findByIdAndUpdate(id, { $push: { "levels.$[a].spellings": data } }, { "arrayFilters": [{ 'a._id': req.body.levelId }] })
        return res.status(200).json({
            message: "New Word Was Added"
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.deleteWord = async function (req, res, next) {
    try {
        let id = req.query.id
        console.log(req.body);

        await Category.findByIdAndUpdate(id, { $pull: { 'levels.$[a].spellings': { '_id': req.body.wordId } } }, { "arrayFilters": [{ 'a._id': req.body.levelId }] })
        return res.status(200).json({
            message: "Data Deleted successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}