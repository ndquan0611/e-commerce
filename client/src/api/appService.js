import axios from '~/utils/httpRequest';

export const apiGetCategories = () =>
    axios({
        url: 'productcategory',
        method: 'get',
    });
