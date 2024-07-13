import { loginURL } from "../spotifyLogic/spotifyLogic";

const Login = () => {
    
    return(
        <div className="background-login">
            <div className="items-center flex flex-col justify-center mx-auto">
                <img src="spotify-logo.webp" alt="logo spotify"/>
                <a href={loginURL} className="cursor-pointer mt-8 inline-flex items-center justify-center rounded-xl bg-slate-900 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]">
                    Ingresar 
                </a>
            </div>
        </div>

    )
}

export default Login;
