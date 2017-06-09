'use strict'


var Auto = require('../models/auto')

function prueba(req, res) {
    if (req.params.id) {
        var id = req.params.id
    } else {
        var id = "SIN ID"
    }
    res.status(200).send(
        {
            message: "Este es el id"+id
        }
     )
}
function saveAuto(req, res){
    var auto = new Auto(req.body);
    auto.save(function(err, autoSaved){
        if(err){
            console.log(err)
            res.status(500).send({message: 'Error al guardar el auto', error:err});
       }else{
                res.status(200).send({saved:autoSaved})
      }
    });
};

function getAuto(req, res){
    var autoId = req.params.id;
    var mongoose = require('mongoose'),
    config = require('../config.js')

    //res.status(200).send({data:autoId})
    var idValido = mongoose.Types.ObjectId.isValid(autoId);
    if(!idValido){ 
        res.status(409).send({message:'Id Invalido.'});
    }else{
        Auto.findById(autoId, function(err,auto){
            if(err){
                console.log(err)
                res.status(500).send({message: "No existe el auto con el id proporcionado."});
            }else{
                if(!auto){
                    res.status(404).send({message: 'No existe el auto con el id proporcionado'});
                }else{
                    res.status(200).send({auto})
                }
            }
        });
    }
}

function getAutos(req, res){
    //console.log("Entre")
    //res.status(200).send({metodo: "getAutos"})
    Auto.find({}).sort('anio').exec(function(err,autos){
        if(err){
            console.log(err)
            res.status(500).send({message:'Error al obtener los autos', error:err});
        }else{
            res.status(200).send({autos})
        }
    });
}

function updateAuto(req, res){
    var autoId = req.params.id;
    var mongoose = require('mongoose'),
    config = require('../config.js')
    var idValido = mongoose.Types.ObjectId.isValid(autoId);
    if(!idValido){
        res.status(409).send({message:'Id Invalido'});
    }else{
        Auto.findByIdAndUpdate(autoId, req.body, function(err,autoUpdate){
            if(err){
                console.log(err)
                res.status(500).send({message: 'Error al actualizar el Auto', error:err});
            }else{
                if(!autoUpdate){
                    res.status(404).send({message: 'No existe el auto con el id proporcionado'});
                }else{
                    Auto.findById(autoId, function(err, autoNuevo){
                        res.status(200).send({viejo:autoUpdate, nuevo:autoNuevo})
                    });
                }
            }
        });
    }
}
function deleteAuto(req, res){
    var autoId = req.params.id;
    var mongoose = require('mongoose'),
    var autoId = req.params.id;
    var idValido =  mongoose.Types.ObjectId.isValid(autoId);
    if(!idValido){
        res.status(409).send({message:'Id Invalido'});
    }else{
        Auto.findById(autoId, function(err,auto){
            if(err){
                console.log(err)
                res.status(500).send({message: 'Error al obtener el auto', error:err});
            }else{
                if(!auto){
                    res.status(404).send({message: 'No existe el auto con el id proporcionado'});
                }else{
                    auto.remove(function(err){
                        if(err){
                            res.status(500).send({message: 'Error al eliminar el auto',error:err});
                        }else{
                            res.status(200).send({message: 'El auto se ha eliminado correctamen'});
                        }
                    });
                }
            }
        })
    }
}

module.exports = {
    prueba,
    getAuto,
    getAutos,
    saveAuto,
    updateAuto,
    deleteAuto
}


