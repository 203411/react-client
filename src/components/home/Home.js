import Navbar from "../navbar/Navbar";
import home from './Home.module.css';

function Home(){
    return(
        <div>
            <Navbar></Navbar>
                
            
            <div className={home.body}>
                <div className={home.container}>
                    <div className={home.img}>
                        <h1>Hello World.</h1>
                        <p>
                            Aliqua cillum eiusmod aliqua amet aliquip exercitation.
                        </p>
                        <br/>
                        <p>
                            Laboris eiusmod nostrud excepteur cupidatat id nisi dolor do ullamco proident aute anim. Laborum velit adipisicing pariatur nostrud ex magna ea ea nisi non pariatur adipisicing amet.
                        </p>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Home;