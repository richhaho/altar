import format from "date-fns/format";

export type Message = {
    fromId: string;
    text: string;
    timeStamp: number;
    id: String;
    image?: string
    name?: string
}

export type ChatItem = {
    [name: string] : {
    fromId: string;
    id: string;
    text: string;
    timeStamp: number;
    username?: string;
    image?: string;
    key?: string
    }
}

export const socialDateString = (orgDateString: number) => {

    console.log("orgDateString ", orgDateString) 

     const result = new Date((orgDateString * 1000))

     console.log(result)
    
     const now = new Date()
    
     const diffInSeconds = (now.getTime() - result.getTime()) / 1000
    
     if (diffInSeconds < 60) {
    return 'Just Now'
     } else if (diffInSeconds < 3600) {
     return `${Math.floor(diffInSeconds / 60)} mins ago`
     } else {
        console.log("got here")
     if (format(now, 'yyyy-MM-dd') === format(result, 'yyyy-MM-dd')) {
     return format(result, 'h:mm a')
     } else {
        console.log("got here")
     return format(result, 'MMM d, h:mm a')
     }
     }
    }