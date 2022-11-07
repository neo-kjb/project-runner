#!/usr/bin/env node

import program from 'caporal';
import debounce from 'lodash.debounce';
import chokidar from "chokidar";
import {spawn} from 'child_process';
import fs from'fs';
import chalk from 'chalk';


program
.version('1.4.0')
.argument('[filename]','Name of the file')
.action(async({filename})=>{
    const name = filename || 'index.js'

    try{
        await fs.promises.access(name)
    } catch(err){
        throw new Error (`could not find the file ${name}`);
    }

    let prcc;
    const start = debounce(()=>{
        if(prcc){
            prcc.kill();
        }
        console.log(chalk.green('---Staring process---'));
        prcc =spawn('node',[name],{stdio:'inherit'});
            },100);


    chokidar.watch('.')
        .on('add',start)
        .on('change' ,start)
        .on('unlink', start)



})
program.parse(process.argv);









