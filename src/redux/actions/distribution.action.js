import distributionService from "../../services/distribution.service";
export const SET_DISTRIBUTION_TYPE='[distribution] SET_DISTRIBUTION_TYPE'
export const SET_TREAT_DISTRIBUTION='[distribution] SET_TREAT_DISTRIBUTION'

export function setDistributionType(types){
    return {
        type:SET_DISTRIBUTION_TYPE,
        payload:types
    }
}

export function fetchDistributionType(){
    return async (dispatch)=>{
        const types= await distributionService.fetchDistributionType();
        dispatch(setDistributionType(types));
    }
}
export function setTreatDistribution(rows){
    return {
        type:SET_TREAT_DISTRIBUTION,
        payload:rows
    }
}

export function fetchTreatDistribution(messageCode){
    return async (dispatch)=>{
        const rows= await distributionService.fetchTreatDistribution(messageCode);
        dispatch(setTreatDistribution(rows));
    }
}
