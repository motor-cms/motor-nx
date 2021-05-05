export interface CallbackInterface {
    id: number;
    name: string;
    action: string;
    destination: string;
    title: string;
    link: string;
    body: string;
    is_timed: boolean;
    has_fired: boolean;
    embargo_until: string;
    fired_at: string;
    hash: string;
    payload: string;
}
