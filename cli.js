#!/usr/bin/env node

const { mdLinks } = require('./index.js');
const api = require('./api');
const process = require('process');
const args = process.argv;
const colors = require('colors');

function cli() {

    const path = process.argv[2];
    const validate = args.includes('--validate') || args.includes('--v');
    const stats = args.includes('--stats') || args.includes('--s');
    const help = args.includes('--help') || args.includes('--h');

    if (!path || help) {
        console.log(colors.brightMagenta.bold('Bienvenido a tu librería mdLinks'));
        console.log(colors.brightGreen.bold('*********************************'))
        console.log('mdLinks es una librería que te permite verificar los status de las URL en tus archivos .md .\n');
        console.log('Primero introduce la ruta del archivo o folder para que podamos leerlo y extraer los links.\n');
        console.log('Seguido a ello, puedes usar los siguientes comandos:\n')
        console.log(colors.brightCyan('--validate o --v:               Te daremos un arreglo con los status de los links.'));
        console.log(colors.brightCyan('--stats o --s:                  Te brindaremos las estadísticas de los links totales y unicos.'));
        console.log(colors.brightCyan('--validate --stats o --v --s:   Te brindaremos las estadísticas de los links rotos.'));
    }
    else if (!validate && !stats) {
        return mdLinks(path, { validate: false }).then((object) => {
            for (let i = 0; i < object.length; i++) {
                console.log(colors.brightCyan('***************************************************************************'));
                console.log(colors.brightMagenta('HREF  :', object[i].href));
                console.log('TEXT  :', object[i].text);
                console.log('FILE  :', object[i].file);
            }
            process.exit(0);
        }).catch(console.error)
    }
    else if (validate && !stats) {
        return mdLinks(path, { validate: validate }).then((object) => {
            for (let i = 0; i < object.length; i++) {
                if (object[i].ok === 'fail') {
                    console.log(colors.brightCyan('***************************************************************************'));
                    console.log(colors.brightMagenta('HREF:', object[i].href));
                    console.log('TEXT   :', object[i].text);
                    console.log('FILE   :', object[i].file);
                    console.log(colors.red('STATUS :', object[i].status));
                    console.log(colors.red('OK     :', object[i].ok));
                }
                else {
                    console.log(colors.brightCyan('***************************************************************************'));
                    console.log(colors.brightMagenta('HREF:', object[i].href));
                    console.log('TEXT   :', object[i].text);
                    console.log('FILE   :', object[i].file);
                    console.log(colors.green('STATUS :', object[i].status));
                    console.log(colors.green('OK     :', object[i].ok));
                }
            }
            process.exit(0);
        }).catch(console.error);
    }
    else if (!validate && stats) {
        return mdLinks(path, { validate: stats }).then((object) => {
            const totalLinks = api.totalLinks(object);
            const uniqueLinks = api.uniqueLinks(object);
            console.log(colors.cyan.bold(totalLinks));
            console.log(colors.cyan.bold(uniqueLinks));
            process.exit(0);
        }).catch(console.error);
    }
    else if (validate && stats) {
        return mdLinks(path, { validate: validate, stats }).then((object) => {
            const totalLinks = api.totalLinks(object);
            const uniqueLinks = api.uniqueLinks(object);
            const brokenLinks = api.brokenLinks(object);
            console.log(colors.cyan.bold(totalLinks));
            console.log(colors.cyan.bold(uniqueLinks));
            console.log(colors.red.bold(brokenLinks));
            process.exit(0);
        }).catch(console.error);
    }
};

cli()
