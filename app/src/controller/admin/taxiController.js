const {sequelize,DataTypes} = require('../../index');

const TaxiRateLists = require('../../model/taxi_rate_lists')(sequelize, DataTypes);

const controller = {};

/**
 * @params:      
 * @purpose:     To view contact us listing
*/
controller.taxiRateListIndex = async (req, res) => {
    await TaxiRateLists.findAll().then(data => {
        return res.render('taxiRateLists/index', {data: data, stackScript: '../partials/script/index', stackLink: '../partials/link/index'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      id
 * @purpose:     To view Taxi Rate List edit form
*/
controller.taxiRateListEdit = async (req, res) => {
    await TaxiRateLists.findOne({where: {id: req.params.id}}).then(data => {
        return res.render('taxiRateLists/edit', {data: data, stackScript: '../partials/script/taxiRateListForm', customScript: '../partials/script/taxiRateListCustomScript'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      Request, id
 * @purpose:     To update Taxi Rate List
*/
controller.taxiRateListUpdate = async (req, res) => {
    try {
        await TaxiRateLists.update({per_km_charge: req.body.per_km_charge}, {where: {id: req.params.id}});
        req.toastr.success("Taxi rate list updated successfully.");
        return res.redirect('/admin/taxi_rate_list/index');
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

module.exports = controller;