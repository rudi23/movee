const transformItem = (apiShow) => {
    let image;
    if (apiShow.image === null) {
        image = '//static.tvmaze.com/images/no-img/no-img-portrait-text.png'
    } else {
        image = apiShow.image.medium;
    }

    return {
        id: apiShow.id,
        title: apiShow.name,
        premiered: apiShow.premiered,
        language: apiShow.language,
        image: image,
    }
};

const tvShowTransformer = {
    transformItem: transformItem,
    transformCollection: (apiData) => apiData.map((apiShow) => transformItem(apiShow.show))
};

export default tvShowTransformer;
