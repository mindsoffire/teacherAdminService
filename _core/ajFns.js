// (function (exports, require, module, __filename, __dirname) { // /*(1) moduleWrapperFn
    const os = require('os');


    const totalMem = () => `${os.totalmem()} + ${Date.now().toString()}`;
    const cpusUsed = os.cpus().forEach((x, idx) => console.log(JSON.stringify(x), 'cpu-' + (idx + 1)));

    console.log({ totalMem: totalMem(), cpusUsed });
    setTimeout(() => console.log(totalMem()), 3000);
    console.log(totalMem());
    console.log(totalMem());
    console.log(totalMem());
// }); // (1)*/ moduleWrapperFn
