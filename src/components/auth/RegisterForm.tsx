import {useState} from 'react';
import * as React from "react";
import {RegisterRequest} from "../../types/auth";
import {useUserService} from "../../hooks/services/useUserService.tsx";

interface RegisterFormProps {
    onSuccess?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
    const [registerData, setRegisterData] = useState<RegisterRequest>({
        email: '',
        username: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const {register} = useUserService()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await register(registerData);
            console.log('Register successful:', response);
            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Register failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Register</h3>

            {error && <div className="error-message">{error}</div>}

            <div>
                <label htmlFor="register-username">Username:</label>
                <input
                    type="username"
                    id="register-username"
                    name="username"
                    value={registerData.username}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="register-email">Email:</label>
                <input
                    type="text"
                    id="register-email"
                    name="email"
                    value={registerData.email}
                    onChange={handleChange}
                    required
                />
            </div>


            <div>
                <label htmlFor="register-password">Password:</label>
                <input
                    type="password"
                    id="register-password"
                    name="password"
                    value={registerData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
};