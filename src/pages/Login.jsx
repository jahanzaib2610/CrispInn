// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { toast } from 'react-hot-toast';
// import { login } from '../store/slices/authSlice';

// function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Mock authentication - in a real app, this would call an API
//     if (formData.email === 'admin@example.com' && formData.password === 'admin') {
//       dispatch(login({
//         name: 'Admin User',
//         email: formData.email,
//         role: 'admin',
//       }));
//       toast.success('Welcome back, Admin!');
//       navigate('/admin');
//     } else if (formData.email === 'user@example.com' && formData.password === 'user') {
//       dispatch(login({
//         name: 'Regular User',
//         email: formData.email,
//         role: 'user',
//       }));
//       toast.success('Welcome back!');
//       navigate('/');
//     } else {
//       toast.error('Invalid credentials');
//     }
//   };

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   return (
//     <div className="max-w-md mx-auto">
//       <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
      
//       <form onSubmit={handleSubmit} className="card p-6">
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
//           />
//         </div>

//         <button type="submit" className="w-full btn btn-primary mb-4">
//           Login
//         </button>

//         <div className="text-sm text-center text-gray-600 dark:text-gray-400">
//           <p className="mb-2">Demo Credentials:</p>
//           <p>Admin: admin@example.com / admin</p>
//           <p>User: user@example.com / user</p>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login





import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { login } from '../store/slices/authSlice';
// import { Eye, EyeOff } from 'lucide-react';
import { LuEye, LuEyeClosed  } from "react-icons/lu";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.email === 'admin@example.com' && formData.password === 'admin') {
      dispatch(login({
        name: 'Admin User',
        email: formData.email,
        role: 'admin',
      }));
      toast.success('Welcome back, Admin!');
      navigate('/admin');
    } else if (formData.email === 'user@example.com' && formData.password === 'user') {
      dispatch(login({
        name: 'Regular User',
        email: formData.email,
        role: 'user',
      }));
      toast.success('Welcome back!');
      navigate('/');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
      
      <form onSubmit={handleSubmit} className="card p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <LuEyeClosed size={20} /> : <LuEye size={20} />}
            </button>
          </div>
        </div>

        <button type="submit" className="w-full btn btn-primary mb-4">
          Login
        </button>

        <div className="text-sm text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">Demo Credentials:</p>
          <p>Admin: admin@example.com / admin</p>
          <p>User: user@example.com / user</p>
        </div>
      </form>
    </div>
  );
}

export default Login;
