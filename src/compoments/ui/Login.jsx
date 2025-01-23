/* eslint-disable react/prop-types */
const Login = ({ onLogin }) => {
  return (
    <div className="login-container">
      <h2>Login with Spotify</h2>
      <button onClick={onLogin}>Connect with Spotify</button>
    </div>
  );
};

export default Login;
