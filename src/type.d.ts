interface Feeding {
  id?: string;
  amount: number;
  date: string;
  notes?: string;
  starterId: string;
}

interface Starter {
  id?: string;
  acquired: string;
  name: string;
  feedingIds?: string[];
  loafIds?: string[];
  notes?: string;
}

interface Loaf {
  id?: string;
  date: string;
  image?: AirTableAttachment[];
  name: string;
  rating: number;
  starterId: string;
  notes?: string;
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

interface AirTableAttachment {
  id?: string;
  size?: number;
  type?: string;
  url: string;
  filename: string;
  thumbnails?: {
    small: {
      url: string;
      width: number;
      height: number;
    };
    large: {
      url: string;
      width: number;
      height: number;
    };
  };
}
