// 先行铺垫两个新 function:
    // Math.ceil : 用于余数加一，例如 100 / 9 ， 显示为 12，确保所有 element 正常显示。
    // Array.from ：用于形成一个新的 array，
        // 可用 length （1st parameter）规定区间个数 和 callback （2nd parameter）来规定区间长度，
        // 如无特殊规定则从 0 开始。
        // 本次使用的：Array.from({length: 12}, (_,index)), callback 可以执行一个 map。

    // Array.from Examples:
        // Array.from([1, 2, 3], (x) => x + x);
            // [2, 4, 6]
        // Array.from({ length: 5 }, (v, i) => i);
            // [0, 1, 2, 3, 4]

        // const range = (start, stop, step) =>
        // Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
        
        // Generate numbers range 0..4
        // range(0, 4, 1);
        // [0, 1, 2, 3, 4]
        
        // Generate numbers range 1..10 with step of 2
        // range(1, 10, 2);
        // [1, 3, 5, 7, 9]

const paginate = (followers) => {
    const perPage = 9;
    const pages = Math.ceil(followers.length / perPage); // 等于 12
    
    const newArray = Array.from({length:pages}, (_,index) => { // 从 0 开始遍历 12 次
        const start = index * perPage;
        return followers.slice(start, start + perPage);
    })
    // console.log(newArray);
    return newArray;
}

export default paginate
