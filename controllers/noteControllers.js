const { ObjectId } = require('mongodb');
const { getDb } = require('../db');


const get_AllNotes = (req, res) => {
    let arr = [];
    let db = getDb();
    db.collection('notes')
        .find()
        .sort({ title: 1 })
        .forEach(note => arr.push(note))
        .then((result) => res.status(200).render('allNotes', { title: 'All Notes', notes: arr }))
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Could Not find any notes' });
        });
}

const get_CreatePage =  (req, res) => {
    res.render('create', { title: 'Create new Note' });
}

const post_CreatePage =  (req, res) => {
    const note = req.body;
    let db = getDb();
    db.collection('notes')
        .insertOne(note)
        .then((result) => res.redirect('/notes'))
        .catch(err => console.log(err));
}

const get_OneNote = (req, res) => {
    const id = req.params.id;
    let db = getDb();
    if (ObjectId.isValid(id)) {
        db.collection('notes')
            .findOne({ _id: new ObjectId(id) })
            .then((doc) => {
                if (doc !== null) {
                    res.render('details', { title: 'Note details', note: doc });
                } else {
                    res.status(500).json({ err: 'document not found' });
                }
            });
    }
    else {
        res.status(404).send('NOT VALID ID');
    }
}


const delete_note = (req, res) => {
    const id = req.params.id;
    let db = getDb();
    if (ObjectId.isValid(id)) {
        db.collection('notes')
            .deleteOne({ _id: new ObjectId(id) })
            .then(() => {
                //res.redirect('/notes');
                res.json({redirect: '/notes'});
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not delete the document' });
            })
    }
    else {
        res.status(404).send('NOT VALID ID');
    }
}

module.exports = {
    get_AllNotes,
    get_CreatePage,
    post_CreatePage,
    get_OneNote,
    delete_note
}