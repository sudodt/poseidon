import app from '../config/app.json';

export const routeToSearchFilter = (slug, query) => {
    let detected = false;
    let demand = false;
    let category = false;
    const searchQuery = {};
    const demandData = app.demandData;

    switch (slug.length) {
        case 1:
            detected = sperateDemandCategory(slug[0]);
            demand = detected.demand.slug;
            category = detected.category;

            searchQuery.demand = demand;
            searchQuery.category = category;
            break;
        case 2:
            detected = sperateDemandCategory(slug[1]);
            demand = detected.demand.slug;
            category = detected.category;

            searchQuery.city = slug[0];
            searchQuery.demand = demand;
            break;
        case 3:
            detected = sperateDemandCategory(slug[2]);
            demand = detected.demand.slug;
            category = detected.category;

            searchQuery.city = slug[0];
            searchQuery.district = slug[1];
            searchQuery.demand = demand;
            searchQuery.category = category;
            break;
        default:
            break;
    };

    delete query.slug;

    for (var index in query) {
        searchQuery[index] = query[index];
    }

    return searchQuery;
};

export const filterToSlug = (searchQuery, key, value) => {
    if (value instanceof Object) {
        if (key === 'city' && searchQuery['city'] !== value.slug) {
            searchQuery['district'] = ''
            searchQuery['ward'] = ''
        }
        if (key === 'category' && searchQuery['category'] !== value.slug) {
            searchQuery['specialty'] = ''
        }

        searchQuery[key] = value.slug || value.value;
    }
    else {
        if (key === 'city') {
            searchQuery['district'] = ''
            searchQuery['ward'] = ''
        }
        if (key === 'category') {
            searchQuery['specialty'] = ''
        }
        searchQuery[key] = value;
    }

    return searchQuery;
}

export const getUrl = (searchQuery) => {
    const demandCategory = searchQuery.category 
        ? `${searchQuery.demand}-${searchQuery.category}`
        : searchQuery.demand;

    let makeSlug = [
        searchQuery.city,
        searchQuery.district,
        demandCategory,
    ];
    let makeParams = [
        {key : 'sort', value : searchQuery.sort},
        {key : 'acreage', value : searchQuery.acreage},
        {key : 'ward', value : searchQuery.ward},
        {key : 'specialty', value : searchQuery.specialty},
        {key : 'price', value : searchQuery.price},
        {key : 'direction', value : searchQuery.direction},
        {key : 'juridical', value : searchQuery.juridical},
        {key : 'bedroom', value : searchQuery.bedroom},
        {key : 'bathroom', value : searchQuery.bathroom},
    ];
   
    makeSlug = makeSlug.filter(res => res);
    makeSlug = makeSlug.join('/');
    makeParams = makeParams.map((param) => {
        return `${param.key}=${param.value || ''}`;
    }).join('&');

    return `${makeSlug}?${makeParams}`;
};

export const checkViewType = (slug, query) => {
    let viewType = 'list';
    if (slug instanceof Array && slug.length === 1) {
        const url = slug[0];
        viewType = url.split('-').find(res => { return res === 'pid' });
    }
    if (viewType === 'pid') {
        return 'page';
    }
    if (query?.map === 'true') {
        return 'map';
    }
    return 'list'
};

export const getCode = (path) => {
    const part = path.split('pid')
    return part.slice(-1).pop().replace('-', '');
}

export const getThumbImageSrc = (images) => {
    if (!images.length) {
        return process.env.NO_IMAGE || '';
    }

    return process.env.STATIC + '/' + images[0];
}

const sperateDemandCategory = (slug) => {
    let temp = slug.split('-');
    const demandData = app.demandData;
    const word = `${temp[0]}-${temp[1]}`;
    const demand = demandData.find(res => res.name === word) || {};

    delete temp[0];
    delete temp[1];
    temp = temp.filter(res => res);
    const category = temp.length ? temp.join('-') : '';
    
    return {demand, category};
 
};

