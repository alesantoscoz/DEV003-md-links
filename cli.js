#!/usr/bin/env node

const { mdLinks } = require('./index.js');
const api = require('./api');
const process = require('process');
const args = process.argv;

function cli() {

    const path = process.argv[2];
    const validate = args.includes('--validate') || args.includes('--v');
    const stats = args.includes('--stats') || args.includes('--s');
    const help = args.includes('--help') || args.includes('--h');

    if(!path || help){
        console.log('Bienvenido a tu librería mdLinks');
        console.log('Primero introduce la ruta del archivo o folder para que podamos leerla.');
        console.log('Seguido a ello, puedes usar los siguientes comandos:')
        console.log('--validate: Te daremos un arreglo con los status de los links.');
        console.log('--stats: Te brindaremos las estadísticas de los links totales y unicos.');
        console.log('--validate --stats: Te brindaremos las estadísticas de los links rotos.');
    }
    else if (!validate && !stats) {
        return mdLinks(path, { validate: false }).then((object) => {
            console.log(object);
            process.exit(0);
        }).catch(console.error)
    }
    else if (validate && !stats) {
        return mdLinks(path, { validate: validate }).then((object) => {
            console.log(object);
            process.exit(0);
        }).catch(console.error);
    }
    else if (!validate && stats) {
        return mdLinks(path, { validate: stats }).then((object) => {
            const totalLinks = api.totalLinks(object);
            const uniqueLinks = api.uniqueLinks(object);
            console.log(totalLinks)
            console.log(uniqueLinks);
            process.exit(0);
        }).catch(console.error);
    }
    else if (validate && stats) {
        return mdLinks(path, { validate: validate, stats }).then((object) => {
            const totalLinks = api.totalLinks(object);
            const uniqueLinks = api.uniqueLinks(object);
            const brokenLinks = api.brokenLinks(object);
            console.log(totalLinks);
            console.log(uniqueLinks);
            console.log(brokenLinks);
            process.exit(0);
        }).catch(console.error);
    }
};

cli()
