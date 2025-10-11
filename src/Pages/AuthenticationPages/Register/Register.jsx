import React from 'react';
import { Link } from 'react-router';
import SocialLogin from '../SocialAuth/SocialLogin';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../hooks/UseAuth';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser } = UseAuth();
    const handleRegister = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className='max-w-xl'>
            <form onSubmit={handleSubmit(handleRegister)}>
                <div className='mb-6'>
                    <h1 className='text-black font-extrabold text-5xl mb-2'>Create an Account</h1>
                    <p className='font-medium text-base'>Register with ProFast</p>
                </div>
                <fieldset className="fieldset">
                    {/* name field */}
                    <label className="label">Name</label>
                    <input type="text"
                        {...register("name", { required: true, minLength: 6 })}
                        className="input w-full" placeholder="Name" />
                    {errors.name?.type === "required" && (<p className='text-red-500'>Name is required?</p>)}
                    {errors.name?.type === "minLength" && (<p className='text-red-500'>Name must be 6 characters or longer!</p>)}

                    {/* email field */}
                    <label className="label">Email</label>
                    <input type="email"
                        {...register("email", { required: "email address is required" })}
                        aria-invalid={errors.email ? "true" : "false"}
                        className="input w-full" placeholder="Email" />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

                    {/* Password field */}
                    <label className="label">Password</label>
                    <input type="password"
                        {...register("password", { required: true, minLength: 6 })}
                        className="input w-full" placeholder="Password" />

                    {errors.password?.type === "required" && (<p className='text-red-500'>Invalid password!</p>)}
                    {errors.password?.type === "minLength" && (<p className='text-red-500'> Password must be 6 characters or longer!</p>)}

                    <button className="btn btn-primary text-[#1F1F1F] mt-4">Register</button>
                </fieldset>
                <p className='text-[#71717A] py-2'>Already have an account? <Link to="/login" className='text-[#CAEB66] '>Login</Link></p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;