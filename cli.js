 const { mdLinks } = require('./index.js');
 const api = require('./api');
 const process = require('process');
 const args = process.argv;

 function cli(){
    const path = process.argv[2];
    const validate = args.includes('--validate');
    const stats = args.includes('--stats');
   
    if (!validate&&!stats){
      return mdLinks(path,{ validate: false }).then((object)=>{
        console.log(object)
       }).catch(console.error)
    }
    else if (validate&&!stats){
       return mdLinks(path, {validate: validate}).then((object)=>{
        console.log(object);
            }).catch(console.error);
    }
    else if (!validate&&stats)
    return mdLinks(path, {validate: stats}).then((object)=>{
    const totalLinks = api.totalLinks(object);
    const uniqueLinks = api.uniqueLinks(object);
    const brokenLinks = api.brokenLinks(object);
    console.log(totalLinks, uniqueLinks, brokenLinks);
    }).catch(console.error);

 };

cli()
