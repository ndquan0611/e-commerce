import axios from '~/utils/httpRequest';

export const apiGetProducts = (params) =>
    axios({
        url: 'product',
        method: 'get',
        params,
    });
