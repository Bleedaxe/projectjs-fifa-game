// ;(function () {    
//     const DomService = (function () {
//         const createElement = function (type) {
//             return window.document.createElement(type);
//         }

//         const getElementById = function (id) {
//             return window.document.getElementById(id);
//         }
//         const addEventListener = function (eventType, callback) {
//             window.addEventListener(eventType, callback);
//         }
//         return {
//             body: window.document.body,
//             location: window.location,
//             createElement,
//             getElementById,
//             addEventListener
//         };
//     })();

//     module.exports = DomService;
// })();