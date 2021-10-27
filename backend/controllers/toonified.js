const { getToonifiedImageByCategory } = require("../services/toonify");
const apiResponse = require("../utils/apiResponse");
const TOONIFIED_CATE_LABEL = "toonify";
const NSFW_CATE_LABEL = "nsfw-detector";

exports.getToonifiedImage = async (req, res) => {
    try {
        const { path: filePath } = req.file;
        if (req.file && filePath) {
           const toonifiedImageByCategory = await getToonifiedImageByCategory(filePath, TOONIFIED_CATE_LABEL.toString());
           if(toonifiedImageByCategory instanceof Error) {
               return apiResponse.ErrorResponse(res, error);
           } else {
               return apiResponse.successResponseWithData(res, "Success", toonifiedImageByCategory)
           }
        } else {
            apiResponse.notFoundResponse(res, "Please provide the file");
        }
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};

exports.nsfwDetector = async (req, res) => {
    try {
        const { path: filePath } = req.file;
        if (req.file && filePath) {
           const toonifiedImageByCategory = await getToonifiedImageByCategory(filePath, NSFW_CATE_LABEL.toString());
           if(toonifiedImageByCategory instanceof Error) {
            return apiResponse.ErrorResponse(res, error);
        } else {
            return apiResponse.successResponseWithData(res, "Success", toonifiedImageByCategory)
        }
     } else {
            apiResponse.notFoundResponse(res, "Please provide the file");
        }
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
};