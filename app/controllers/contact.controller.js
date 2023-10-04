const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const ContactService = require("../services/contact.service");
const ContactService = require("../services/contact.service");
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = (req, res) => {
    res.send({ message: "create handler"});
}
//Create and save a new contact
exports.create = async (req,res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const ContactService = new ContactService(Mongodb.client);
        const document = await ContactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

exports.findAll = (req, res) => {
    res.send({ message: "findAll handler"});
};
// Retrieve all contacts of a user from the database
exports.findAll = async (req,res,next) => {
    let documents = [];

    try{
        const ContactService = new ContactService(MongoDB.client);
        const {name } = req.query;
        if(name) {
            documents = await ContactService.findByName(name);
        } else {
            documents = await ContactService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(400, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
}

exports.findOne = (req, res) => {
    res.send({ message: "findOne handler"});
};
//Find a single contact with an id
exports.findOne = async (req, res, next) => {
    try {
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.findById(req.params.id);
        if(!document) {
            return next(new ApiError(404,"Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
};

exports.update = (req, res) => {
    res.send({ message: "update handler"});
};
//Update a contact by the id in the request
exports.update = async (req,res, next) => {
    if(Object.keys(req.body).length ===0) {
        return next(new ApiError(400, "Data to upadate can not be empty"));
    }
    try {
        const ContactService = new ContactService(MongoDB.client);
        const document =await ContactService.update(req.params.id,req.body);
        if(!document) {
            return next(new ApiError(404,"Contact not found"));
        }
        return res.send({ message: "Contact was upadated successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Error upadating contact with id=${req.params.id}`)
        );
    }
};
exports.delete = (req, res) => { 
    res.send({ message: "delete handler"});
};
//Delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Contact was deleted successfully"});
    } catch(error) {
        return next(
            new ApiError(
                500,
                `Could not delete contact with id=${req.params.id}`
            )
        );
    }
};
exports.deleteAll = (req, res) => {
    res.send({ message: "deleteAll handler"});
};
//Delete all contacts of a user from the database
exports.deleteAll = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deletedCount = await contactService.deleteAll();
        return res.send({
            message: '${deletedCount} contacts were deleted successfully',
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
};

exports.findAllFavorite = (req, res) => {
    res.send({ message: "findAllFavorite handler"});
};
//Find all favorite contacts of a user
exports.findAllFavorite = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while retrieving favorite contacts"
            )
        );
    }
};
