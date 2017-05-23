const showListFactory = (apiData) => apiData.map(apiShow => {
    return {
        title: apiShow.show.name,
        premiered: apiShow.show.premiered,
        language: apiShow.show.language,
        image: apiShow.show.image,
    }
});

export default showListFactory;
