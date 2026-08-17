import { auth, signIn } from '@/server/auth';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login',
};

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect('/admin');
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-card border-border w-full max-w-sm rounded-xl border p-8">
        <h1 className="text-2xl font-semibold tracking-tight">Workshop Admin</h1>
        <p className="text-muted-foreground mt-2 text-sm">Sign in to manage your workshop.</p>
        <form
          className="mt-6"
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: '/admin' });
          }}
        >
          <button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}
