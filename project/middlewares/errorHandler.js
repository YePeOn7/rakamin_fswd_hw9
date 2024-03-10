function errorHandler(err, req, res, next){
    console.log("Get Error Bro >>>>> ", err);
    if(err.code === "23505"){
        res.status(406).json({message: err.detail});
    }
    else if(err.name == "Unauthenticated"){
        res.status(401).json({message: "Unauthenticated"});
    }
    else if(err.name == "Unauthorized"){
        res.status(403).json({message: "Unauthorized"});
    }
    else if(err.name == "Invalid Credential"){
        res.status(401).json({message: "Invalid Credential"});
    }
    else{
        res.status(500).json({message: "Internal Server Error",
                                error: err});
        console.log(err);
    }
}

module.exports = errorHandler;