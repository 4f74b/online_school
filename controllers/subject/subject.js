const Class = require('../../data-modals/class/class');
const Subject = require('../../data-modals/class/subject');
const Material = require('../../data-modals/class/material');
const SubjectFile = require('../../data-modals/class/subjectFile')

module.exports.viewSubject = async function (req, res) {
    const subject = await Subject.findById(req.params.id);
    const cls = await Class.findById(subject.class).populate([
        {
            path: 'courses',
            match: { _id: subject._id },
            populate: [
                {
                    path: 'teacher',
                    populate: { path: 'userInfo' }
                },
                {
                    path: 'material',
                    select: ['materialDetail', 'materialTitle', 'files'], // include the files field
                    populate: {
                        path: 'files',
                        select: ['filename'], // specify the desired fields from the file collection
                    },
                },
            ],
        },
        {
            path: 'students',
            populate: { path: 'userInfo' }
        }
    ]);
    console.log(cls.courses[0].material[4])
    res.render('subject/view-subject', { cls });
}

module.exports.addMaterialToSubject = async function (req, res) {
    let material = await new Material({ ...req.body });
    let file;
    for (let file of req.files) {
        file = await new SubjectFile({
            filename: file.originalname,
            data: file.buffer
        })
        await file.save();
        material.files.push(file._id);
    }
    material.subject = req.params.subjectId;
    // save object id of material in subject
    await Subject.findByIdAndUpdate(req.params.subjectId, { $push: { material: material._id } });
    await material.save();
    req.flash('success', 'Successfully added new material to class');
    res.redirect(`/${res.locals.domainName}/teacher/subject/${req.params.subjectId}/view`)
}

module.exports.getMaterial = async function (req, res) {
    const fileId = req.params.materialId;

    try {
        // Find the file by its ID
        const file = await Material.findById(fileId);

        if (!file) {
            res.status(404).send('File not found');
            return;
        }

        // Set the appropriate response headers
        res.set({
            'Content-Type': file.contentType,
            'Content-Disposition': 'inline',
        });

        // Send the file contents as the response body
        res.send(file.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};