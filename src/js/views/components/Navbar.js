let Navbar = {
    render: async () => {
        let view =  /*html*/`
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" href="#">Teams</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#/history">History</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
            </ul>
        `
        return view
    },
    after_render: async () => { }

}

export default Navbar;