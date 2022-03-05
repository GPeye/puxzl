export class Letter {
    status:Status=Status.Blank;
    value:string="";
}

export enum Status{
    Blank,
    NotFound,
    WrongPosition,
    WrongPositionMulti,
    CorrectPosition,
    CorrectPositionMulti
}