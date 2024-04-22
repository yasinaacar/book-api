const slugify=require("slugify");

const slugOptions={
    replacement: '-',  // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true,      // convert to lower case, defaults to `false`
    strict: false,     // strip special characters except replacement, defaults to `false`
    locale: 're',      // language code of the locale to use
    trim: true 
};

function slugfield(str){
    return slugify(str, slugOptions);
}

module.exports=slugfield;