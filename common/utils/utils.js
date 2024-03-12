

class Utils {
    static parseSort=(sort,order)=>{
        if (order === 'desc' )
            sort = '-'.concat(sort);
        return sort;
    }
}

module.exports = Utils;