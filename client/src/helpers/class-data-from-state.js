export default function classDataFromObj(obj){
    return {
        title: obj.title,
        description: obj.description,
        duration: obj.duration,
        costPerDevice: obj.costPerDevice,
        mealKitCost: obj.mealKitCost,
        hasMealKit: obj.hasMealKit,
        thumbnail: obj.thumbnail,
    }
}