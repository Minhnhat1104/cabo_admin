// id
// from
// to
// phoneNumber
// customer
// driver
// status

export function sortDataListByUpdatedAtDesc(dataList: any[]): any[] {
  return dataList.sort((a, b) => b.updatedAt - a.updatedAt);
}

export const convertItem = (_data: any) => {
  const newItem = {
    id: _data?.tripId,
    from: _data?.customerOrderLocation,
    to: _data?.toLocation,
    phoneNumber: _data?.customerPhoneNumber,
    customer: _data?.customerName,
    driver: _data?.driverName,
    status: _data?.status,
    updatedAt: _data?.updatedAt,
  };

  return newItem;
};

export const convertDataToItems = (data: any) => {
  const items: any[] = [];
  data?.map((_data: any, i: number) => {
    const newItem = convertItem(_data);

    items.push(newItem);
  });

  return items;
};
