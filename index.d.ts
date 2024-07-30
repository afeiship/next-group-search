interface CallbackOptions {
  item: any;
  index: number;
  keyword: string;
  groupName: string;
}

interface GroupSearchOptions {
  allKeys?: any[];
  callback?: (options: CallbackOptions) => boolean;
}

interface NxStatic {
  groupSearch: (group: any, keyword: string, options?: GroupSearchOptions) => any;
}
