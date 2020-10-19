

export interface TypeHike {
    name: string;
    start: Date;
    finish: Date;
    subscription: string;
    discription: string;
    visible: string;
    teamInfo: string;
    leaderEmail: string;
}


export interface TypeHikeWrapper {
    hike: TypeHike
}