'use server';

import { cosmic } from '@/lib/cosmic';
import { revalidatePath } from 'next/cache';

export async function addReview(formData: FormData) {
  const title = formData.get('title') as string;
  const reviewer_name = formData.get('reviewer_name') as string;
  const comment = formData.get('comment') as string;
  const rating = formData.get('rating') as string;
  const productId = formData.get('productId') as string;

  if (!title || !reviewer_name || !comment || !rating || !productId) {
    return { success: false, error: 'All fields are required' };
  }

  // Map the rating to the exact select-dropdown value keys as defined in content model
  // Assuming keys are "1", "2", "3", "4", "5"
  const ratingKey = rating.toString();

  try {
    await cosmic.objects.insertOne({
      title: title,
      type: 'reviews',
      metadata: {
        rating: ratingKey,
        comment: comment,
        reviewer_name: reviewer_name,
        product: productId,
      },
    });

    revalidatePath(`/products/[slug]`, 'page');
    return { success: true };
  } catch (error) {
    console.error('Failed to add review:', error);
    return { success: false, error: 'Failed to submit review. Please try again.' };
  }
}