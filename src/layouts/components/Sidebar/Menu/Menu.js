
function Menu({children}) {
    return (
        <nav className="flex flex-col shadow-sm pb-3">
            {children}
        </nav>
    );
}

export default Menu;