export class bookModel{
    constructor(
        public name:string,
        public image:string,
        public description:string,
        public author:string,
        public _id:string

    ){}
}
export class bookModel2{
    constructor(
        public name:string,
        public image:string,
        public description:string,
        public author:string,
    ){}
}


// onst BookSchema = new Schema({
//     name: String,
//     images: [ImageSchema],
//     description: String,
//     author:String,
//     owner:{
//         type:Schema.Types.ObjectId,
//         ref:'User'

//     }

// });
// const Book = mongoose.model('Book',BookSchema);