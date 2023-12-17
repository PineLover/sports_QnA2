import FormNewPost from '@/components/form-new-post'
import { getCurrentUser } from '@/lib/session';
import Image from 'next/image'

export default async function Home() {
  return (
    <main className="max-w-4xl mx-auto my-5">
      <FormNewPost />
    </main>
  )
}
