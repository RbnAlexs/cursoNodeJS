'use strict';

var database = require('../database'),
mongoose = require('mongoose'),
Schema = mongoose.Schema;

var AutoSchema = new Schema(
    {
        marca:{
            type: String,
            trim: true,
            default: '',
            required: 'inserta una marca por favor',
            index:{
                unique: false,
                dropDups: true
            }
        },
        modelo:{
            type: String,
            required: 'Inserta un modelo por favor',
            default: '',
            index:{
                unique: false,
                dropDups: true
            }
        },
        anio:{
            type: Number,
            required: 'Inserta un anio por favor',
            default: '',
            index:{
                unique: false,
                dropDups: true
            }
        },
        version:{
            type: String,
            trim: true,
            required: 'Inserta una version por favor',
            default: '',
            index: {
                unique: false,
                dropDups: true
            }
        }
    },
    {
        timestamps: true
    }

);


var Auto = mongoose.model('Auto', AutoSchema);
module.exports = Auto;