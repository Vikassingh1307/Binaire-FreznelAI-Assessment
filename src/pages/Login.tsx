import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await authService.signUp(email, password);
      } else {
        await authService.login(email, password);
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-16 px-4 bg-[#1b2838] min-h-[calc(100vh-104px)]">
      <div className="bg-[#181a21] p-8 w-full max-w-xl rounded shadow-lg text-[#c6d4df]">
        <h2 className="text-3xl font-light text-white uppercase tracking-wider mb-8">
          {isSignUp ? 'Create an Account' : 'Sign In'}
        </h2>

        {error && (
          <div className="bg-[#a84732] text-white p-3 mb-6 rounded text-sm font-semibold shadow-[0_0_10px_rgba(168,71,50,0.5)]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm text-[#afc1cc] uppercase tracking-wider mb-2 font-semibold">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#32353c] text-white p-3 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
              required 
            />
          </div>

          <div>
            <label className="block text-sm text-[#afc1cc] uppercase tracking-wider mb-2 font-semibold">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#32353c] text-white p-3 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 bg-gradient-to-r from-[#47bfff] to-[#1a44c2] text-white p-3 rounded uppercase font-semibold tracking-wider hover:from-[#34a7e3] hover:to-[#173cb0] disabled:opacity-50 transition-all focus-visible:outline-white focus-visible:ring-2"
          >
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div className="mt-8 text-center text-sm border-t border-[#313843] pt-6">
          <p className="mb-2">{isSignUp ? 'Already have an account?' : 'Not registered yet?'}</p>
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-white hover:text-blue-400 hover:underline transition-colors focus-visible:outline-white focus-visible:ring-2 p-1"
          >
            {isSignUp ? 'Sign In to existing account' : 'Join Steam for free'}
          </button>
        </div>
      </div>
    </div>
  );
}
