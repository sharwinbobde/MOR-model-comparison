let config = require('./config.json')
let admin = require("firebase-admin");
serviceAccount = require(config.service_key_path);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.db_url,
    storageBucket: "mor-model-comparison.appspot.com",

});

let db = admin.firestore();
let store = admin.storage().bucket()

csv = require('csv-parser');
fs = require('fs');

// exit(0)

fs.createReadStream('./upload_bundle/sheets_info.csv')
    .pipe(csv())
    .on('data', (row)=>{
        console.log(row)
        db.collection("sheet-music").add({
            name: row.name,
            owner: config.user_uid,
            users: [
                config.user_uid
            ]
        })
            .then(doc=>{
                let doc_id = doc.id
                console.log(doc_id)
                store.upload('./upload_bundle/sheets/'+ row.pdf_filename,{
                    destination: 'sheet-music/'+doc_id,
                    contentType: 'application/pdf'
                }).then(doc=>{
                    // console.log(doc)
                }).catch(err => {
                    console.log(err)
                    }
                )
            })

    })
    .on('end', ()=>{
        console.log("read entire csv :)")
    })




console.log("HELLO")