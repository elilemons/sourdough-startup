interface Feeding {
  id?: string;
  amount: number;
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
  loafIds?: string[];
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

interface GetFeatureItemsAsyncParams<T> {
  actionType: string;
  featureItemsGet: () => Promise<{ data: T[] }>;
}

interface ApiRequest {
  featureName: string;
}

interface PostRequest<T> extends ApiRequest {
  newItem: T;
}

interface UpdateRequest<T> extends ApiRequest {
  updatedItem: T;
}

interface DeleteRequest extends ApiRequest {
  id: string;
}

interface AirTableRecord {
  id: string;
  fields: { [key: string]: any };
}
interface DeleteResponse {
  id: string;
  deleted: boolean;
}
