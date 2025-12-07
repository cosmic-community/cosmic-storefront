import { Review } from '@/lib/types';
import { Star } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">
        No reviews yet. Be the first to write one!
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-8 last:border-0">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">{review.metadata.reviewer_name}</h4>
            <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
          </div>
          <div className="mt-2 flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= parseInt(review.metadata.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <h5 className="mt-4 font-medium text-gray-900">{review.title}</h5>
          <p className="mt-2 text-gray-600">{review.metadata.comment}</p>
        </div>
      ))}
    </div>
  );
}