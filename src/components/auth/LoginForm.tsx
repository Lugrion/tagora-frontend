import React, { useState } from 'react';
import {LoginRequest} from "../../types/auth";
import {useUserService} from "../../hooks/services/useUserService.tsx";

interface LoginFormProps {
    onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const [loginData, setLoginData] = useState<LoginRequest>({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {login} = useUserService()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await login(loginData);
            console.log('Login successful:', response);
            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Login</h3>

            {error && <div className="error-message">{error}</div>}

            <div>
                <label htmlFor="login-email">Email:</label>
                <input
                    type="text"
                    id="login-email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="login-password">Password:</label>
                <input
                    type="password"
                    id="login-password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
};