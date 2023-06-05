import { Channel } from "./Channel";

export type Notification = {
    id: number;
    channel: Channel;
    createdAt: Date;
    type: string;
    seenAt: Date;
}