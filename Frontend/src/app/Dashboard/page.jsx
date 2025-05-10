import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';

export default async function Dashboard() {
  try {
    const user = await getUser();
    
    if (!user) {
      redirect('/');
    }
    
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <LogoutButton />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Welcome, {user.name}!</h2>
            <p className="mb-2">Your user details:</p>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Dashboard error:', error);
    redirect('/');
  }
}