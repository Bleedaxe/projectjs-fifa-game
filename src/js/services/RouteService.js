import Home from '../views/pages/Home.js';
import Error404 from '../views/pages/Error404.js';

import Navbar from '../views/components/Navbar.js';
import Bottom from '../views/components/Bottom.js';

import RequestService from './RequestService.js';

const routes = {
    '/' : Home,
};

const router = async () => {
    const header = document.getElementById('header_container');
    const content = document.getElementById('page_container');
    const footer = document.getElementById('footer_container');
    
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();
    footer.innerHTML = await Bottom.render();
    await Bottom.after_render();

    let request = RequestService.parseRequestUrl();

    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
    
    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    content.innerHTML = "";
    let contentHtml = await page.render();
    content.innerHTML = contentHtml;
    await page.after_render();
    
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);