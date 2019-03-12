import Home from '../views/pages/Home.js';
import Error404 from '../views/pages/Error404.js';

import Navbar from '../views/components/Navbar.js';
import Bottom from '../views/components/Bottom.js';
import Matches from '../views/pages/Matches.js';

import RequestService from './RequestService.js';

import PubSub from '../../observer/PubSub.js';
import CONSTANTS from '../util/constants.js';
import Group from '../views/pages/Groups.js';
import History from '../views/pages/History.js';

const onPageRender = function (request) {
    const index = Object.keys(localStorage).length;
    localStorage[index] = request;
}

const initial = function () {
    PubSub.subscribe(CONSTANTS.events.searchChange, router);
    PubSub.subscribe(CONSTANTS.events.historyAdd, onPageRender)
};

const routes = {
    '/' : Home,
    '/matches/:id' : Matches,
    '/matches' : Matches,
    '/group/:id' : Group,
    '/history' : History
};

const onLoad = async function () {
    const header = document.getElementById('header_container');
    const footer = document.getElementById('footer_container');
    
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();
    footer.innerHTML = await Bottom.render();
    await Bottom.after_render();

    await router();
}

const onHashChange = async function () {
    window.history.replaceState(null, location.hash, "/" + location.hash);
    await router();
}

const router = async () => {
    const content = document.getElementById('page_container');
    content.innerHTML = "Loading...";

    let request = RequestService.parseRequestUrl();
    PubSub.publish(CONSTANTS.events.historyAdd, location.href);
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '');

    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    let contentHtml = await page.render(request.id);
    content.innerHTML = contentHtml;
    await page.after_render();
    
}

initial();

window.addEventListener('hashchange', onHashChange);
window.addEventListener('load', onLoad);