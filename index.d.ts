interface CallbackOptions {
  item: any;
  index: number;

  [key: string]: any;
}

interface GroupSearchOptions {
  callback?: (options: CallbackOptions) => boolean;
}

interface NxStatic {
  groupSearch: (group: any, options?: GroupSearchOptions) => any;
}
