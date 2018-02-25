"use strict";

export class ProxyFactry{

    constructor(){
        throw new Error('This class must not be instancied.');
    }

    static create(object, triggerPropsNames, traps){

        let _executeTraps = traps => {
            traps.map(trap=>{
                if(typeof(trap) === typeof(Function)) return trap();
                throw new Error(`The trap [${trap}] is not a function.`);
            });
        }

        return new Proxy(object, {

            get(target, prop, receiver){

                if(triggerPropsNames.includes(prop) && 
                  (typeof(target[prop] == typeof(Function)))){

                    return function () {

                        let result = target[prop].apply(target, arguments);
                
                        if((!!result) && typeof(result[prop] == typeof(Promise)))
                            result.then(_executeTraps(traps));
                        else _executeTraps(traps);
                    
                        return result;
                    }
                }
                else return target[prop];
            },

            set(target, prop, value, receiver){
                const update = Reflect(target, prop, value);
                if (triggerPropsNames.includes(prop))
                    return _executeTraps(traps);
                return update;
            }
        });
    }
}