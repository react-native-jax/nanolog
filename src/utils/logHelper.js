import { AsyncStorage } from 'react-native';

const LIST_KEY = '@Nanolog:list';

export async function getLogList() {
  const list = await AsyncStorage.getItem(LIST_KEY);
  return JSON.parse(list) || [];
}

export async function createLog(name) {
  const list = await getLogList();
  let newList = [...list, { name }];
  await AsyncStorage.setItem(LIST_KEY, JSON.stringify(newList));
}
