let Navbar = {
    render: async () => {
        let result = 
        `
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link" href="#">Teams</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#matches">Matches</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#history">History</a>
                </li>
            </ul>
        `
        return result
    },
    after_render: async () => { }
}

export default Navbar;