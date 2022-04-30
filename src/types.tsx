export interface ReduxState {
  cart: {
    cart: {
        id: number;
        title: string;
        artist: string;
        url?: string;
        originalPrice: number;
        salePrice: number | null;
        rating: number;
        quantity: number;
        genres: string[]
      }[];
    quantity: number;
  }
  auth: {
    isLogged: boolean
    full_name: string | null
    uid: string | null
  }
  vinyls : {
    vinyls: {
      id: number;
      title: string;
      artist: string;
      url: string;
      originalPrice: number;
      salePrice: number | null;
      rating: number;
      genres: string[]
    }[];
  }
}

export interface VinylState {
  vinyls: {
      id: number;
      title: string;
      artist: string;
      url: string;
      originalPrice: number;
      salePrice: number | null;
      rating: number;
      genres: string[]
    }[];
}

export interface CartState {
  cart: {
      id: number;
      title: string;
      artist: string;
      url?: string;
      originalPrice: number;
      salePrice: number | null;
      rating: number;
      quantity: number;
      genres: string[]
    }[];
  quantity: number;
}

export interface AuthState {
  isLogged: boolean
  full_name: string | null
  uid: string | null
}

export type VinylType = {
  id: number;
  title: string;
  artist: string;
  url: string;
  originalPrice: number;
  salePrice: number | null;
  rating: number;
  genres: string[]
}

export type OrderType = {
  order: {
    firstName: string;
    lastName: string;
    companyName: string | null;
    address: string;
    unit: string | null;
    city: string;
    email: string;
    postalOrZip: string;
    provinceOrState: string;
    country: string;
    subtotal: number;
    total: number;
    orderDate: string
    deliveryDate: string;
    uid: string;
    orderId: string;
    items: {
      id: number;
      title: string;
      artist: string;
      url: string;
      originalPrice: number;
      salePrice: number;
      rating: number;
      quantity: number;
      genres: string[]
    }[];
  }
  deleteOrder?: React.Dispatch<React.SetStateAction<any>>
}


export type OrderArrayType = {
  firstName: string;
  lastName: string;
  companyName: string | null;
  address: string;
  unit: string | null;
  city: string;
  email: string;
  postalOrZip: string;
  provinceOrState: string;
  country: string;
  subtotal: number;
  total: number;
  orderDate: string
  deliveryDate: string;
  uid: string;
  orderId: string;
  items: {
    id: number;
    title: string;
    artist: string;
    url: string;
    originalPrice: number;
    salePrice: number;
    rating: number;
    quantity: number;
    genres: string[]
  }[];
}

export type skeletonVinylArrayType = {
  id: number;
  title: string;
  artist: string;
  originalPrice: number;
  salePrice: number | null;
  rating: number;
  genres: string[]
}[]

export type OrderItemType = {
  item: {
    id: number;
    title: string;
    artist: string;
    url: string;
    originalPrice: number;
    salePrice: number;
    rating: number;
    quantity: number;
    genres: string[];
  };
};

export type CheckoutFormType = {
  cartSubtotal: number,
  cartTotal: number,
}

export type CartItemType = {
  vinyl: {
  id: number;
  title: string;
  artist: string;
  url?: string;
  originalPrice: number;
  salePrice: number | null;
  rating: number;
  quantity: number;
  genres: string[]
  }
}
