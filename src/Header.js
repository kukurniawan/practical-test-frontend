import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const header = () => {
    return (
        <>
            <header>
                <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                    <div class="container">
                        <a class="navbar-brand" href="/">Open Weather </a>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default header