export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    price: number;
    sku: string;
    description: string;
    main_image: CosmicImage;
    image_gallery?: CosmicImage[];
    collection: Collection; // Connected object
    in_stock: boolean;
  };
}

export interface Collection extends CosmicObject {
  type: 'collections';
  metadata: {
    description?: string;
    cover_image: CosmicImage;
  };
}

export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    rating: string; // "1", "2", "3", "4", "5"
    comment: string;
    reviewer_name: string;
    product: Product; // Connected object
  };
}