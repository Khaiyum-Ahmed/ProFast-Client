import errorImg from "../../assets/images/404 error with person looking for-bro.png"
const ErrorPage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <img className="w-4xl" src={errorImg} alt="" />
        </div>
    );
};

export default ErrorPage;