export default function Login() {
    return (
        <form>
            <div>
                <label>Email:</label>
                <input type="email" />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}