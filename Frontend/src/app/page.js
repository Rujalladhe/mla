import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/LoginForm';

export default async function Home() {
  try {
    const cookieStore = cookies();
    const tokenCookie = await cookieStore.get('jwt-token');

    // Check if user is authenticated
    if (tokenCookie?.value) {
      // Use a client-side redirect instead
      return redirect('/Dashboard');
    }

    // User is not authenticated, show login form
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6">
        <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl">
          {/* Left Section */}
          <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507521628349-6e9b803b7e84?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent"></div>
            <div className="relative p-6 flex flex-col justify-between h-full text-white">
              <div>
                <h2 className="text-2xl font-semibold tracking-wide">MLA </h2>
                <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">
                  Dashboard
                </a>
              </div>
              <div>
               
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <h1 className="text-3xl font-bold mb-2">Login to Your Account</h1>
            
            <div className="bg-white rounded-lg p-6 text-black">
              <LoginForm />
              
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    // If it's a redirect error, let it propagate
    if (error.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }

    // Log other errors
    console.error('Error checking authentication:', error);

    // Show login form as fallback
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6">
        <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl">
          {/* Left Section */}
          <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507521628349-6e9b803b7e84?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent"></div>
            <div className="relative p-6 flex flex-col justify-between h-full text-white">
              <div>
                <h2 className="text-2xl font-semibold tracking-wide">AMU</h2>
                
              </div>
              
            </div>
          </div>
          {/* Right Section */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <h1 className="text-3xl font-bold mb-2">Login to Your Account</h1>
            
            <div className="bg-white rounded-lg p-6 text-black">
              <LoginForm />
              
            </div>
          </div>
        </div>
      </main>
    );
  }
}