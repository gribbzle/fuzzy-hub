import {
  Avatar,
  Button,
  FavoriteButton,
  Link,
  RatingStars,
} from "@portal/ui/atoms";

export interface ProductActionsProps {
  price: number;
  seller: {
    name: string;
    avatarSrc: string;
    rating: number;
    reviewsCount: number;
    testimonial: string;
    href: string;
  };
  onFavoriteClick?: () => void;
  onMessageClick?: () => void;
  onWriteReviewClick?: () => void;
}

export const ProductActions = ({
  price,
  seller,
  onFavoriteClick,
  onMessageClick,
  onWriteReviewClick,
}: ProductActionsProps) => (
  <div className="flex w-full max-w-77.5 flex-col gap-4">
    <div className="bg-bg-light flex flex-col gap-4 rounded-3xl p-6">
      <div className="relative flex items-center">
        <span className="text-32 text-text-default font-fredoka flex-1 text-center font-medium">
          ${price}
        </span>
        <FavoriteButton
          onClick={onFavoriteClick}
          className="absolute right-0"
          shadow
        />
      </div>
      <Button
        variant="primary"
        size="medium"
        fullWidth
        onClick={onMessageClick}
      >
        Message
      </Button>
    </div>
    <div className="bg-bg-light flex flex-col gap-3 rounded-3xl p-6">
      <div className="flex gap-4">
        <Avatar
          src={seller.avatarSrc}
          alt={seller.name}
          className="h-12 w-12"
          loading="lazy"
        />
        <div className="flex flex-col gap-1.5">
          <Link className="text-18 font-bold text-[#2B2B2E]" href={seller.href}>
            {seller.name}
          </Link>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-16 text-text-default font-bold">
                {seller.rating}
              </span>
              <RatingStars rating={seller.rating} size={20} />
            </div>
            <p className="text-12 text-[#757577]">
              Based on {seller.reviewsCount} verified reviews
            </p>
          </div>
        </div>
      </div>
      <p className="text-14 font-medium text-[#2B2B2E]">
        &ldquo;{seller.testimonial}&rdquo;
      </p>
      <Button
        variant="tertiary"
        size="medium"
        fullWidth
        onClick={onWriteReviewClick}
      >
        Write a Review
      </Button>
    </div>
  </div>
);
