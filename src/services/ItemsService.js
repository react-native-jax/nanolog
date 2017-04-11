import { AsyncStorage } from 'react-native';

const LIST_KEY = '@Nanolog:list';

export async function getItems() {
  const list = await AsyncStorage.getItem(LIST_KEY);
  return JSON.parse(list) || [];
}

export async function createItem(name) {
  const list = await getItems();
  let newList = [...list, { name }];
  await AsyncStorage.setItem(LIST_KEY, JSON.stringify(newList));
}

export async function deleteItem(name) {
  const list = await getItems();
  let newList = list.filter(i => i.name !== name);
  await AsyncStorage.setItem(LIST_KEY, JSON.stringify(newList));
}
