import { HTTP_Methods, Labels } from '../../enums';
import { camelCase } from '../../utils';

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
          fields:
            featureName === camelCase(Labels.FEEDING)
              ? { ...newItem, starterId: [newItem.starterId] }
              : {
                  ...newItem,
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

export async function uploadFile(file: File) {
  const data = new FormData();
  data.append('image', file);

  return await fetch('https://api.imgur.com/3/image', {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
    },
    method: 'POST',
    body: data,
  })
    .then((response) => {
      // TODO Remove this test code
      console.log('ELITEST response from imgur', { response });
      // ^ TODO Remove this test code
      return response.json();
    })
    .then((result) => {
      // TODO Remove this test code
      console.log('ELITEST result from imgur', { result });
      // ^ TODO Remove this test code
      return result;
    })
    .catch((error) => {
      console.error('ELITEST uploadFile ERROR', { error });
    });
}

export async function deleteImage(deleteHash: string) {
  return await fetch(`https://api.imgur.com/3/image/${deleteHash}`, {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
    },
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((result) => {
      // TODO Remove this test code
      console.log('ELITEST successfully deleted', { result });
      // ^ TODO Remove this test code
      return result;
    })
    .catch((error) =>
      console.error('There was an error deleting the image: ', { error })
    );
}
