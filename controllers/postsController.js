const db = require('../db/queries');

async function getAllPosts(req, res) {
    const posts = await db.getAllPosts();
    if(!posts){
        res.status(404).json({message:"No Posts founds"});
    } else{
        res.json(posts);
    }
};

async function getOnePost(req, res) {
    
    const post = await db.getOnePost(req.params.id);
    if(!post){
        console.log("NULL");
        res.status(404).json({message:"No Posts founds"});
    }else{
        console.log(req.params.id, post);
        res.json(post);
    }
};

module.exports = {
    getAllPosts,
    getOnePost
}