const Header = () => {
    return (
        <div className="header">
            <h2>Bem vindo, {localStorage.getItem("@username")}</h2>
        </div>
    );
};

export default Header;
