interface Feeding {
  _id?: string;
  amount: string;
  date: string;
  notes?: string;
  starterId: string;
}

interface Starter {
  _id?: string;
  name: string;
  acquired: string;
  notes?: string;
  feedingIds?: string[];
}

interface Loaf {
  _id?: string;
  date: string;
  image: string;
  name: string;
  notes?: string;
  rating: number;
  starterId: string;
}

interface InitialStateType<T> {
  items: T[];
  isLoading: boolean;
  isLoaded: boolean;
  selectedFeatureId: string;
}
