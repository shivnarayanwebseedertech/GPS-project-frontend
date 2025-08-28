import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth.js';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import logo from "../assets/webseederlogo.png";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    const { loginUser } = useContext(AuthContext);

    // Carousel slides with Unsplash images
    const carouselSlides = [
        {
            title: "Welcome Back",
            subtitle: "Sign in to access your dashboard",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&crop=faces"
        },
        {
            title: "Secure Access",
            subtitle: "Your data is protected with enterprise-grade security",
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&crop=faces"
        },
        {
            title: "Modern Interface",
            subtitle: "Experience our redesigned, intuitive platform",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=faces"
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await login(email, password);
            if (data.token) {
                const userData = {
                    email: data.email,
                    name: data.name,
                    id: data.userId,
                    role: data.role,
                    modules: data.modules,
                };
                console.log('Login successful:', data);
                loginUser(userData, data.token);
                navigate('/');
            }
        } catch (err) {
            setError('Login failed: ' + (err.response?.data?.message || err.message));
        }
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    };

    // Auto-advance carousel every 5 seconds
    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 flex">
            {/* Left Side - Carousel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {carouselSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-transform duration-700 ease-in-out ${index === currentSlide ? 'translate-x-0' :
                            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                            }`}
                    >
                        <div className="h-full relative">
                            {/* Background Image */}
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/50"></div>

                            {/* Content */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center px-8 z-10">
                                    <h2 className="text-5xl font-bold text-white mb-6">
                                        {slide.title}
                                    </h2>
                                    <p className="text-xl text-gray-200 max-w-md mx-auto leading-relaxed">
                                        {slide.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Carousel Navigation Dots */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {carouselSlides.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                ? 'bg-white scale-125'
                                : 'bg-white/40 hover:bg-white/60'
                                }`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-8 bg-white">
                <div className="w-full max-w-md">
                    {/* Logo and Header */}
                    <div className="text-center mb-10">
                        <img
                            src={logo}
                            alt="WebSeeder"
                            className="h-16 mx-auto mb-6"
                        />
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600">
                            Sign in to your account to continue
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] shadow-lg"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-500 text-sm">
                            Secured by WebSeeder Technology
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
