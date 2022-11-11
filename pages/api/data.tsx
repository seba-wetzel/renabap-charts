import datos from '../../utils/datos-renabap-peron.json'

const TOTAL_FAMILIAS = 21422;
const TOTAL_FAMILIAS_RENABAP =  10186;

export const RENABAP = {
    'Renabap': TOTAL_FAMILIAS_RENABAP,
    'No renabap': TOTAL_FAMILIAS - TOTAL_FAMILIAS_RENABAP
}



export const ENERGIA = datos.map(item=>({
    familias: item["Familias Aproximadas"], 
    energia:item["Energía eléctrica"]
})).reduce((acc, item)=>{
    if(acc[item.energia]){
        acc[item.energia]+=item.familias
    }else{
        acc[item.energia]=item.familias
    }
    return acc
}
,{})

export const AGUA = datos.map(item=>({
    familias: item["Familias Aproximadas"], 
    agua:item["Agua corriente"]
})).reduce((acc, item)=>{
    if(acc[item.agua]){
        acc[item.agua]+=item.familias
    }else{
        acc[item.agua]=item.familias
    }
    return acc
}
,{})

export const EFLUENTES = datos.map(item=>({
    familias: item["Familias Aproximadas"],
    efluentes:item["Efluentes cloacales"]
})).reduce((acc, item)=>{
    if(acc[item.efluentes]){
        acc[item.efluentes]+=item.familias
    }else{
        acc[item.efluentes]=item.familias
    }
    return acc
}
,{})
    
export const SITUACION_DOMINIAL = datos.map(item=>({
    familias: item["Familias Aproximadas"],
    situacionDominial:item["Situación Dominial"]
})).reduce((acc, item)=>{
    if(acc[item.situacionDominial]){
        acc[item.situacionDominial]+=item.familias
    }else{
        acc[item.situacionDominial]=item.familias
    }
    return acc
}   
,{})

