
const noteModel = require('../models/NotesModel.js');
const express = require("express")
const routes = express.Router()

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
routes.post('/notes', async(req, res) => {
    // Validate request
    try{
        var newNote = new noteModel({
            ...req.body
        })
        await newNote.save()
        res.status(200).json(newNote)
    }catch(error){
        res.status(200).json(error)
    }
    
});
//TODO - Retrieve all Notes
routes.get("/notes", async(req, res) => {
    try{
         var noteList = await noteModel.find()
         res.status(200).json(noteList)
    }catch(error){
        res.status()
        
    }
   
    
})

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
routes.get('/notes/:noteId', async(req, res) => {
    try {
        if(req.params.noteId == undefined){
            res.status(400).send({
                status: false,
                message: "Object book required to be JSON formant"
            })
        }
        var note = await noteModel.findById(req.params.noteId)
        res.status(200).json(note)
    } catch (error) {
        res.status(400).json(error)
    }
    
});





//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
routes.put("/notes/:noteId", async(req, res) => {
    try {
        if(req.params.noteId == undefined){
            res.status(500).send({
                status: false,
                message: "Object book required to be JSON formant"
            })
        }
        const updatedNote = await noteModel.findByIdAndUpdate(req.params.noteId, req.body)
        res.status(200).json(updatedNote)
    } catch (error) {
        res.status(500).json(error)
    }
    
    
})

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
routes.delete('/notes/:noteId', async (req, res) => {
    try{
        if(req.params.noteId == undefined){
            res.status(500).send({
                status: false,
                message: "Object book required to be JSON formant"
            })
        }
       
        
        const note = await noteModel.findOneAndDelete(req.params.noteId)
        if(!note){
            res.status(200).send({message: "Book Not found"})
        }else{
            res.status(200).send(note)
        }
    }catch(error){
        res.status(500).send(error)
    }
});


module.exports = routes