const tvShowListTransformer = (apiData) => apiData.map(apiShow => {
    let image;
    if (apiShow.show.image === null) {
        image = '//static.tvmaze.com/images/no-img/no-img-portrait-text.png'
    } else {
        image = apiShow.show.image.medium;
    }

    return {
        title: apiShow.show.name,
        premiered: apiShow.show.premiered,
        language: apiShow.show.language,
        image: image,
    }
});

export default tvShowListTransformer;
