import { Link } from "react-router-dom"

export default function Register() {
    return (
        <form>
            <div>
                <label>Name:</label>
                <input type="text" />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" />
            </div>
            <div>
                <label>Repeat Password:</label>
                <input type="password"/>
            </div>
            <button type="submit">Register</button>

            <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
    );
}