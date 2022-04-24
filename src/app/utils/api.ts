import { HTTP_Methods } from '../../enums';

const request: RequestInit = {
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    'Content-Type': 'application/json',
  },
};

const apiUrl = () =>
  `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_DATABASE_ID}`;

export async function getItems<T>({ featureName }: ApiRequest): Promise<T[]> {
  return await fetch(`${apiUrl()}/${featureName}`, {
    ...request,
    method: HTTP_Methods.GET,
  })
    .then((response) => response.json())
    .then((data) => {
      // TODO Remove this test code
      console.log('ELITEST getItems SUCESSS', { data });
      //^ TODO Remove this test code
      if (data.error) {
        throw new Error(data.error);
      }

      return data.records.map((record: AirTableRecord) => ({
        ...record.fields,
        id: record.id,
      }));
    })
    .catch((error) => {
      console.error('ELITEST getItems FAILURE', { error });
    });
}

export async function createItem<T extends { [key: string]: any }>({
  featureName,
  newItem,
}: PostRequest<T>): Promise<T[]> {
  return await fetch(`${apiUrl()}/${featureName}`, {
    ...request,
    method: HTTP_Methods.POST,
    body: JSON.stringify({
      records: [
        {
          fields: {
            ...newItem,
            starterId: [...newItem.starterId],
          },
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // TODO Remove this test code
      console.log('ELITEST createItem', { data });
      //^ TODO Remove this test code

      const res = data.records.map((record: AirTableRecord) => ({
        ...record.fields,
        id: record.id,
      }));

      // TODO Remove this test code
      console.log('ELITEST createItem SUCCESS 2', { res });
      //^ TODO Remove this test code
      return res;
    });
}

export async function updateItem<T extends { [key: string]: any }>({
  featureName,
  updatedItem,
}: UpdateRequest<T>): Promise<T[]> {
  // TODO Remove this test code
  console.log('ELITEST updateItem', { updatedItem });
  //^ TODO Remove this test code
  const id = updatedItem.id;
  delete updatedItem._id;
  delete updatedItem.id;
  return await fetch(`${apiUrl()}/${featureName}`, {
    ...request,
    method: HTTP_Methods.PATCH,
    body: JSON.stringify({
      records: [
        {
          id,
          fields: {
            ...updatedItem,
          },
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // TODO Remove this test code
      console.log('ELITEST updateItem SUCCESS', { data });
      //^ TODO Remove this test code
      if (data.error) {
        throw new Error(data.error);
      }
      return data.records.map((record: AirTableRecord) => ({
        ...record.fields,
        id: record.id,
      }));
    })
    .catch((error) => {
      console.error('ELITEST updateItem FAILURE', { error });
    });
}
export async function deleteItem({
  featureName,
  id,
}: DeleteRequest): Promise<DeleteResponse> {
  return await fetch(`${apiUrl()}/${featureName}/${id}`, {
    ...request,
    method: HTTP_Methods.DELETE,
  })
    .then((response) => response.json())
    .then((data) => {
      // TODO Remove this test code
      console.log('ELITEST deleteItem SUCCESS', { data });
      //^ TODO Remove this test code
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    })
    .catch((error) => {
      console.error('ELITEST deleteItem ERROR', { error });
    });
}
