interface CallbackOptions {
  item: any;
  index: number;

  [key: string]: any;
}

interface GroupSearchOptions {
  relation?: 'every' | 'some';
  filters?: any[] | Record<string, any>;
  callback?: (options: CallbackOptions) => boolean;
}

interface NxStatic {
  groupSearch: (group: Record<string, any>, options?: GroupSearchOptions) => any;
}
