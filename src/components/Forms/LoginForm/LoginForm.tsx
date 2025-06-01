import React, { useState } from 'react';
import {LoginRequest} from "../../../types/auth";
import {useAuthStore} from "../../../stores/auth.store.ts";

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

    const login = useAuthStore(set => set.login);

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
        <form className={"form-wrapper"} onSubmit={handleSubmit}>
            <h3>Login</h3>

            <div className={"input-wrapper"}>
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

            <div className={"input-wrapper"}>
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

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
};