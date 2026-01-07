export type Stream = 'Science' | 'Arts' | 'Commercial';

export interface User {
  name: string;
  stream: Stream | null;
}

export interface UserState extends User {
  setName: (name: string) => void;
  selectStream: (stream: Stream) => void;
  reset: () => void;
}
