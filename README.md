# KAPS Automation

A simple Next.js application with Supabase authentication and database integration, ready to be deployed on Vercel.

## Features

- Next.js 14 with App Router
- Supabase authentication
- Supabase database integration
- TypeScript
- Tailwind CSS
- Vercel deployment ready

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn
- Supabase account and project

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://recryyhzwqipwvudfaxw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://postgres:Kapsauto_99@db.recryyhzwqipwvudfaxw.supabase.co:5432/postgres
```

Replace `your-anon-key` and `your-service-role-key` with your actual Supabase keys.

### Installation

```bash
# Install dependencies
npm install
# or
yarn install

# Run the development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Supabase Setup

1. Log in to your Supabase account
2. Create a new project with ID: `recryyhzwqipwvudfaxw`
3. Enable email authentication in Auth settings
4. Create a `profiles` table with the following schema:

```sql
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text not null,
  role text not null,
  created_at timestamp with time zone default now() not null
);

-- Enable RLS and create security policies
alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);
```

### Admin Setup

1. Navigate to `/admin/setup` in your application
2. Create an admin user with email and password
3. Use the admin credentials to log in at `/auth`

## Deployment on Vercel

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Add the environment variables to your Vercel project settings
4. Deploy

## License

This project is licensed under the MIT License.
