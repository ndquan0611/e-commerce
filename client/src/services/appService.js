import * as httpRequest from '~/utils/httpRequest';

export const apiGetCategories = async () => {
    const res = await httpRequest.get('productcategory');
    return res;
};
