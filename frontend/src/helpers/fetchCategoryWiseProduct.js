const { default: SummaryApi } = require("../common")

const fetchCategoryWiseProduct = async(category)=>{
    const response = await fetch(SummaryApi.categoryWiseProduct.url,{
        method : SummaryApi.categoryWiseProduct.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            category : category
        })
    })
    // Kiểm tra phản hồi
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const dataResponse = await response.json()

    return dataResponse
}

export default fetchCategoryWiseProduct