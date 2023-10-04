const { ObjectId} = require("mongodb");

class ContactService {
    constructor(client) {
        this.Contact = client.db().collection("Contacts");


    }
    //Dinh nghĩa cac phuong thuc truy xuat CSDL su dung mongodb API
    extractContactData(payload) {
        const contact = {
            name: payload.name,
            email:payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
        //Remove undefined fields
        Objects.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }

    async create(payload) {
        const contact = this.extractContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            contact,
            { $set: { favorite: contact.favorite === true }},
            { returnDocument: "after", upset: true}
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: {$regex: new RegExp(name), $options: "i"},
        });
    }
    
}
module.exports = ContactService