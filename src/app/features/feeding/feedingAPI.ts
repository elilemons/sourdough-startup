import { feedings } from './feedingData';

export function getFeedings() {
  // TODO Remove this test code
  console.log('ELITEST getFeedings is being called', {});
  //^ TODO Remove this test code
  return new Promise<{ data: Feeding[] }>((resolve) =>
    setTimeout(() => resolve({ data: feedings }), 500)
  );
}
