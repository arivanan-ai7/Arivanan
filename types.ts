
export type Role = 'user' | 'model';

export interface MessagePart {
    text: string;
}

export interface Message {
  role: Role;
  parts: MessagePart[];
  timestamp: Date;
}

export interface Language {
    code: string;
    name: string;
}
