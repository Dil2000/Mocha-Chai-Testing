'use strict';

module.exports = function(sequelize,DataTypes){
	var Blob = sequelize.define("Blob",{
		name: { type: DataTypes.STRING},
		lastName: { type: DataTypes.STRING}			
	});
	return Blob;
};