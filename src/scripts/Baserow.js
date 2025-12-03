const token = 'yGfiMmcSdFgOvD9TJjbEueSiMEkHFegC'
const headers = { "Authorization": `Token ${token}`}

const coursesAPI = 'https://api.baserow.io/api/database/rows/table/714529/?user_field_names=false'
const testimonialsAPI = 'https://api.baserow.io/api/database/rows/table/759955/?user_field_names=false'
const galleryAPI = 'https://api.baserow.io/api/database/rows/table/759992/?user_field_names=false'

const get = async (API, map = () => {}) => {
    const response = await fetch(API,{ headers })
    const json = await response.json()
    //console.log('-------------------\n',API,JSON.stringify(json.results, null, 2))
    return await json.results.map(map)
}

export const getCourses = async () => await get(coursesAPI, (result => ({
    name: result.field_5992975,
    image: result.field_5992988[0].thumbnails.card_cover.url
})))

export const getTestimonials = async () => await get(testimonialsAPI, (result => ({
    name: result.field_6432642,
    text: result.field_6432643,
    role: result.field_6432644,
    image: (result.field_6432825[0]).url
})))

export const getGallery = async () => await get(galleryAPI, (result => ({
    url: (result.field_6432888[0]).url
})))
