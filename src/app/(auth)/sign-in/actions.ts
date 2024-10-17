import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AuthFormValues } from '@/lib/utils';

import { createClient } from '../../../../utils/supabase/server';

export async function login(formData: AuthFormValues) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email,
    password: formData.password,
  }

  console.log(data);

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {

  }
}