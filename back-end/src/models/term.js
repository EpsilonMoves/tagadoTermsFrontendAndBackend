import mongoose from "mongoose";

const termSchema = new mongoose.Schema(
  {
    type: { type: Number, required: true, trim: true },
    terms: { type: Array, required: true, trim: true },
  },
  { strict: false, autoCreate: true, timestamps: true }
);

termSchema.statics.build = (attrs) => {
  return new Term({
    _id: attrs.id,
    type: attrs.type,
    terms: attrs.terms,
  });
};

termSchema.methods.findTypeAndGroup=async function (type) {
    const result= await Term.aggregate([
        {'$match':{type: Number(type)}},
        {'$unwind': "$terms"},
        { '$group': { _id: "$terms", 'count': { $sum: 1 } } },
        {$group:{_id:null,counts:{$push:{k:"$_id", v: "$count" }}}},
        {
            $replaceRoot: {
                newRoot: { $arrayToObject: "$counts" }
            }
        }
    ])
    // $trim is not allowed in this atlas tier
    return result[0]
}


termSchema.methods.addTermToDb=async function(obj){
   const term = await Term.build(obj)
    await term.save()
}

const Term=mongoose.model('Term',termSchema,'TERMS')
export {Term}