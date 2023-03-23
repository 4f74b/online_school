
const Class = require('../data-modals/class/class');
const System = require('../data-modals/system-data');
module.exports.getPageGeneralInfo = async function (req, res) {
    let homePageMaterials = {}, classes = {};
    classes.staticClasses = await Class.find({ classType: 'static', putOnHomePage: true });
    classes.interactiveClasses = await Class.find({ classType: 'interactive' });
    homePageMaterials.systemInfo = await System.findOne();
    homePageMaterials.classes = classes;
    return homePageMaterials;
}