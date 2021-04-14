// export async function getApiData(param) {
//   const res = await (
//     await fetch(`http://127.0.0.1:3000/api/v1/modbus/domain/${param}`)
//   ).json();
//   const data = res.data.doc;

//   data.map((doc) => {
//     if (doc.unit === 'object') {
//       doc.unit = '';
//       const val = doc.value;
//       doc.value = doc.signedValue[val];
//     }
//     return doc;
//   });

//   // console.log(data);

//   return data;
// }

// export async function getAllDomains() {
//   const res = await (
//     await fetch('http://127.0.0.1:3000/api/v1/modbus/')
//   ).json();
//   const data = res.data.doc;

//   let domainArr = [];
//   data.map((doc) => {
//     domainArr.push(doc.domain);
//   });

//   const paramArr = [...new Set(domainArr)].map((val) => {
//     const domainObj = {
//       params: {
//         id: val,
//       },
//     };
//     return domainObj;
//   });

//   return paramArr;
// }
