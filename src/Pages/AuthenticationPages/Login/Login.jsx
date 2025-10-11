import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import SocialLogin from '../SocialAuth/SocialLogin';

const Login = () => {
    const { register, handleSubmit, formState:{errors} } = useForm();
    const onSubmit = (data) => {
        console.log(data)
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

                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
                <p className='text-[#71717A] py-4'>Dont't have any account? <Link to="/register" className='text-[#CAEB66] my-3'>Register</Link></p>
                <SocialLogin></SocialLogin>
                
            </form>
        </div>
    );
};

export default Login;