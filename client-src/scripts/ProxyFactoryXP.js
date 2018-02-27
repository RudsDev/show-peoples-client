"use strict";

/** @module ProxyFactoryXP */

/** A Proxy object that allows specific functions calls for each object method.*/
export class ProxyFactoryXP{

    constructor(){
        throw new Error('This class must not be instancied.');
    }

    /**
     * @param {Object} object - Object will wrapped by Proxy.
     * @param {Object} trapsParams - Literal object containing traps config parameters.
     * @param {string} trapsParams.triggerName - Name of propertie wich trigger the trap.
     * @param {Function} trapsParams.traps - Called functions by defined trigger. 
    */
    static create(object, ...trapsParams){

        let _executeTraps = traps => {
            traps.map(trap=>{
                if(typeof(trap) === typeof(Function)) return trap();
                throw new Error(`The trap [${trap}] is not a function.`);
            });
        }

        return new Proxy(object, {

            get(target, prop, receiver){

                let trap  = trapsParams.find(trapParam=>trapParam.triggerName === prop);

                if( (!!trap) && (typeof(target[prop]) == typeof(Function)) ){

                    return function () {

                        let result = target[prop].apply(target, arguments);
                        
                        if((!!result) && typeof(result[prop] == typeof(Promise)))
                            result.then(_executeTraps(trap.traps));
                        else _executeTraps(trap.traps);
                        
                        return result;
                    }
                }
                else return target[prop];
            }
        });
    }
}