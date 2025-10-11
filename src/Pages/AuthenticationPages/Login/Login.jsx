import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import SocialLogin from '../SocialAuth/SocialLogin';
import UseAuth from '../../../hooks/UseAuth';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = UseAuth();
    const onSubmit = (data) => {
        console.log(data);
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className='max-w-xl'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-6'>
                    <h1 className='text-black font-extrabold text-5xl mb-2'>Welcome Back</h1>
                    <p className='font-medium text-base'>Login with ProFast</p>
                </div>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email"
                        {...register("email", { required: true })}
                        className="input w-full" placeholder="Email" />
                    {errors.email && <p className='text-red-500'>Valid email is required?</p>}

                    <label className="label">Password</label>
                    <input type="password"
                        {...register("password", { required: true, minLength: 8 })}
                        className="input w-full" placeholder="Password" />
                    {errors.password && <p className='text-red-500'>Invalid password!</p>}

                    <div><a className="link link-hover">Forgot password?</a></div>

                    <button className="btn btn-primary text-[#1F1F1F] mt-4">Login</button>
                </fieldset>
                <p className='text-[#71717A] py-2'>Dont't have any account? <Link to="/register" className='text-[#CAEB66] '>Register</Link></p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;